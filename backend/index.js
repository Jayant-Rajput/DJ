import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { connectDB } from './lib/db.js';

import authRoutes from './routes/auth.route.js';

import axios from 'axios'

dotenv.config();
const app = express();

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

app.get("/forces", async(req,res) => {
    let userdata = null;

    console.log("INSIDE FORCES DATA FETCH");
    try{
        const response = await axios.get(`https://codeforces.com/api/user.info?handles=Jayant420&checkHistoricHandles=false`);
        userdata = response.data;
        const response1 = await axios.get(`https://codeforces.com/api/user.rating?handle=Jayant420`);
        userdata.contest = response1.data.result.length;
        
        console.log(userdata);
        res.json(userdata);
    }catch(error){
        console.log("ERROR in forcesDataFetch ", error);
        res.status(500).json({error: error.message})
    }
})

app.listen(PORT, () => {
    console.log("server is running on PORT: ", PORT);
    connectDB();
})



