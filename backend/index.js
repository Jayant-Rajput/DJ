import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import cron from 'node-cron';

import { connectDB } from './lib/db.js';

import authRoutes from './routes/auth.route.js';
import contactRoutes from './routes/contact.route.js'
import axios from 'axios'
import blogRoutes from './routes/blog.route.js';
import messageRoutes from './routes/message.route.js';
import contestRoutes from "./routes/contest.route.js";
import RatingRoutes from "./routes/ratings.route.js";

import { fetchDataAndUpdateDB } from './lib/utils.js';

import {app, server} from './lib/socket.js';

dotenv.config();
// const app = express();

const PORT = process.env.PORT;

app.use(express.json({ limit: '10mb'}));   //profile picture upload from frontend may have size more than 1 mb.
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
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

cron.schedule('0*/2 * * * *' , async () => {      //run in every 2 min
    try {
        console.log('Inside cron job try block');
        await fetchDataAndUpdateDB();
        console.log('Update completed');
    } catch (error) {
        console.error('Error in cron job:', error);
    }
});

server.listen(PORT, () => {
    console.log("server is running on PORT: ", PORT);
    connectDB();
})



