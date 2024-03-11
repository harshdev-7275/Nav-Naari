import express from "express"
import Message from "../models/messageModel.js";


const router = express.Router()


router.post("/sendMessage", async (req, res) => {
   
    try {
        const {message, sender, receiver} = req.body;
        if(!message || !sender || !receiver){
            return res.status(400).json({
                message:"Please provide all required fields"
            })
        }
        const newMsg = await Message.create({
            message,
            sender,
            receiver
        })
        res.status(201).json({
            messsage:"Message sent successfully"
        })
    }catch(error){
        console.log(error)
    }
})
router.get("/getSingleMessage", async(req, res)=>{
    try {
        const receiver = req.query.receiver;    
        console.log(receiver);
        if(!receiver){
            return res.status(400).json({
                message:"Please provide receiver"
            })
        }
        const messages = await Message.find({receiver});
        res.status(200).json({ messages: messages });
    } catch (error) {
        console.log(error);
    }
})
export default router