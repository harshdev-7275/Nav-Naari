import express from "express";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import User from "../models/users.js";
import bcrypt from "bcryptjs"
import Booking from "../models/bookingSchema.js";
import mongoose from "mongoose";

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
        // console.log(newUser);
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
router.get("/getUser/:userId", async (req, res) => {
    try {
        const userId = req.params.userId; // Use req.params to access the userId parameter
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
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
        res.status(500).json({ message: "Internal server error" });
    }
    
    

})

router.put("/updateBooking", async (req, res) => {
    try {
        const {bookingId} = req.body;
        console.log(bookingId);
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        booking.isAccept = true;
        const updated = await booking.save();
        return res.status(200).json({
            message: "Booking updated successfully",
            booking: updated
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
        
    }
})


router.post("/book", async (req, res) => {
    try {
        const { userId:user, workerId:worker, date, time } = req.body;

        // Validate userId and workerId (assuming they are valid ObjectId)
        if (!mongoose.Types.ObjectId.isValid(user) || !mongoose.Types.ObjectId.isValid(worker)) {
            return res.status(400).json({ message: "Invalid user or worker ID" });
        }

        // Create a new booking
        const booking = {user, worker, date, time };

        // Save the new booking
        const newBooking = await Booking.create(booking);

        // Respond with the new booking information
        return res.status(200).json({
            message: "Booking created successfully",
            booking: newBooking
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.get("/bookings", async (req, res) => {
    try {
        const userId = req.query.userId;
        const workerId = req.query.workerId;
        // console.log("fetching bookings", userId, workerId);
   
        // Validate userId and workerId (assuming they are valid ObjectId)
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(workerId)) {
            return res.status(400).json({ message: "Invalid user or worker ID" });
        }

        // Find all bookings for the given user ID and worker ID
        const bookings = await Booking.find({ user: userId, worker: workerId });
        console.log(bookings);

        // Respond with the bookings
        return res.status(200).json(bookings);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});



export default router;
