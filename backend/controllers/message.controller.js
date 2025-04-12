import Message from "../models/message.model.js"
import { io } from "../lib/socket.js";
import cloudinary from  "../lib/cloudinary.js";


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
        const { text, image } = req.body;
        const senderId = req.user._id;
        console.log(text);
        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        const recentSavedMsg = await Message.findOne({
            senderId,
            text,
            image: imageUrl,
          }).populate("senderId", "fullname profilePic");
          
        console.log(recentSavedMsg);

        io.emit("newMessage",recentSavedMsg);

        res.status(201).json(recentSavedMsg);   

    }catch(error){
        console.log("ERROR in sendMessage controller: ", error);
        res.status(500).json({message: "Internal Server Error"})
    }
}