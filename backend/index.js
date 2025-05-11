import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import cron from "node-cron";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import contactRoutes from "./routes/contact.route.js";
import axios from "axios";
import blogRoutes from "./routes/blog.route.js";
import messageRoutes from "./routes/message.route.js";
import contestRoutes from "./routes/contest.route.js";
import RatingRoutes from "./routes/ratings.route.js";

import Message from "./models/message.model.js";
import User from "./models/user.model.js";
import Contest from "./models/contest.model.js";
import admin from "./lib/firebase-admin.js";

import { fetchDataAndUpdateDB } from "./lib/utils.js";

import { app, server } from "./lib/socket.js";

dotenv.config();
// const app = express();

const PORT = process.env.PORT;

app.use(express.json({ limit: "10mb" })); //profile picture upload from frontend may have size more than 1 mb.
app.use(cookieParser());
app.use(
  cors({
    origin: "https://haccnitrr.netlify.app",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/contest", contestRoutes);
app.use("/api/ratings", RatingRoutes);
app.use(express.static("public"));

cron.schedule("0 */6 * * *", async () => {
  //run in every 6 hours
  try {
    console.log("Inside cron job try block");
    await fetchDataAndUpdateDB();
    console.log("Update completed");
  } catch (error) {
    console.error("Error in cron job:", error);
  }
});


cron.schedule("0 0 * * *", async () => {          //run everyday at 00:00
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 4);

    await Message.deleteMany({ createdAt: { $lte: cutoffDate } });
    console.log("Old messages deleted");
  } catch (error) {
    console.error("Error in second cron job: ", error);
  }
});
cron.schedule("*/30 * * * *", async () => {
  console.log("Running cron job to check upcoming contests...");

  const now = Date.now();
  const thirtyMinsLater = now + 90 * 60 * 1000;        // 90 minutes later

  try {
    const upcomingContests = await Contest.find({
      rawStartTime: { $gte: now, $lte: thirtyMinsLater }
    });

    if (upcomingContests.length === 0) {
      console.log("No upcoming contests in next 30 minutes.");
      return;
    }

    const users = await User.find({ notiToken: { $exists: true, $ne: null } });
    const tokens = users.map(u => u.notiToken).filter(Boolean);

    console.log("no. of tokens: ", tokens.length);

    for (const contest of upcomingContests) {
      const messages = tokens.map(token => ({
        token,
        notification: {
          title: "Contest Starting Soon!",
          body: `${contest.title} is starting at ${new Date(contest.rawStartTime).toLocaleDateString()}`,
          image: "/contest.jpg",
        },
      }));
    
      try {
        const response = await admin.messaging().sendEach(messages);
        console.log(`Sent to ${response.successCount} users. Failed: ${response.failureCount}`);
      } catch (err) {
        console.error(`Error sending notifications for contest ${contest.title}:`, err);
      }
    }
    

  } catch (err) {
    console.error("Cron error:", err);
  }
});




server.listen(PORT, () => {
  console.log("server is running on PORT: ", PORT);
  connectDB();
});
