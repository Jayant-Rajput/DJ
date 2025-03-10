import Message from "../models/message.model.js"
import { io } from "../lib/socket.js";


export const getMessages = async(req, res) => {
    try{
        const messages = await Message.find().populate("senderId","fullname profilePic");
        res.status(200).json(messages);
    }catch(error){
        console.log("ERROR in getMessages controller: ", error);
        res.status(500).json({message: "Error in fetching all Messges"});
    }
}

export const sendMessage = async(req,res) => {
    try{
        const { text } = req.body;
        const senderId = req.user._id;

        const newMessage = new Message({
            senderId,
            text,
        });

        await newMessage.save();

        const recentSavedMsg = await Message.findOne({senderId, text}).populate("senderId","fullname profilePic");

        io.emit("newMessage",recentSavedMsg);

        res.status(201).json(recentSavedMsg);   

    }catch(error){
        console.log("ERROR in sendMessage controller: ", error);
        res.status(500).json({message: "Internal Server Error"})
    }
}