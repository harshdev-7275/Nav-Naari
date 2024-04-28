import express from "express"
import Message from "../models/bookingSchema.js";


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
        console.log(messages);
        res.status(200).json({ messages: messages });
    } catch (error) {
        console.log(error);
    }
})

router.post("/deleteSingleMessage", async(req, res)=>{
    try {
        const {id} = req.body;
        console.log(id);
        if(!id){
            return res.status(400).json({
                message:"Please provide a message id"
            })
        }
        const message = await Message.findByIdAndDelete(id);
        console.log(message);
        res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
        console.log(error);
    }
})



export default router