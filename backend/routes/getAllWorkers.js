import express from "express";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import Worker from "../models/workers.js";

const router = express.Router();

router.get("/getAllWorkers", async (req, res) => {
    try {
        let query = {};

        // Check if profession parameter exists in query
        if (req.query.profession) {
            query.profession = req.query.profession;
        }

        // Check if location parameter exists in query and validate it against enum values
        if (req.query.location) {
            // Ensure that the provided location is one of the enum values
            const locationEnumValues = ['Banshankari', 'RR Nagar', 'JP Nagar'];
            if (!locationEnumValues.includes(req.query.location)) {
                return res.status(400).json({ message: "Invalid location value" });
            }

            query.location = req.query.location;
        }

        const workers = await Worker.find(query);
        res.json(workers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
