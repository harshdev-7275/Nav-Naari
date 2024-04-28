import express from "express";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import Worker from "../models/workers.js";
import Booking from "../models/bookingSchema.js";

const router = express.Router();

router.post("/createWorkerProfile", async (req, res) => {
    try {
        // Check if the request body contains all required fields
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Extract fields from the request body
        const { email, name, location, phoneNumber, profession, isAvailable, userId } = req.body;

        // Check if the worker profile already exists
        const existingWorker = await Worker.findOne({ email });
        if (existingWorker) {
            return res.status(400).json({ message: "Worker profile already exists" });
        }
        if(!userId){
            return res.status(400).json({ message: "User Id is required" });
        }

        // Create a new Worker instance
        const worker = new Worker({
            email,
            name,
            location,
            phoneNumber,
            profession,
            isAvailable,
            user: userId
        });

        // Save the worker profile to the database
        await worker.save();

        // Return success response
        res.status(201).json({ message: "Worker profile created successfully", worker });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.get("/getBookings", async (req, res) => {
    // console.log("dadadwaewadaw");
    try {
        const workerId = req.query.workerId; // Use req.params.workerId
        console.log("fetching bookings", workerId,);
        const bookings = await Booking.find({ worker: workerId }); // Assuming `worker` is the correct field name
        // console.log(bookings);
        if (bookings.length > 0) { // Check if bookings array is not empty
            return res.status(200).json({
                success: true,
                bookings
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No bookings found"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});


export default router;
