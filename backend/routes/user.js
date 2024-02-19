import express from "express";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import User from "../models/users.js";
import bcrypt from "bcryptjs"

const router = express.Router();

router.post("/register", async (req, res) => {
    
   
    try {
        
        let user = await User.findOne({ email: req.body.email });

        const {email,name, password, location, phoneNumber} = req.body
        
        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            email,
            name,
            password: hashedPassword,
            location,
            phoneNumber
        });
        await newUser.save();
        console.log(newUser);
        const token = jwt.sign({ userId: newUser.id }, process.env.SECRET_KEY, {
            expiresIn: "1d"
        });
        res.cookie("auth", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000
        });
        return res.status(200).json({
            _id: newUser._id,
            email: newUser.email,
            name: newUser.name,
            isWorker: newUser.isWorker,
            location: newUser.location,
            phoneNumber: newUser.phoneNumber,
            
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});



router.post("/createWorker", async (req, res) => {
    try {
        const {email} = req.body; 
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        user.isWorker = true;
        const updated = await user.save();
        return res.status(200).json({
            _id: updated._id,
            email: updated.email,
            name: updated.name,
            isWorker: updated.isWorker,
            location: updated.location,
            phoneNumber: updated.phoneNumber,
            isWorker: updated.isWorker,
        });
       
    } catch (error) {
        console.log(error);
    }
    
    

})


export default router;
