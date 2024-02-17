import express from "express";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import Worker from "../models/workers.js";

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

export default router;
