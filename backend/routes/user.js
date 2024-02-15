import express from "express";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import User from "../models/users.js";

const router = express.Router();

router.post("/register", [
    check("name", "Name is required").notEmpty().isString(),
    check("email", "Please provide a valid email").isEmail(),
    check("password", "Password must be at least 6 characters long").isLength({ min: 6 }),
    check("location", "Location is required and must be one of Banshankari, RR Nagar, or JP Nagar").isIn(['Banshankari', 'RR Nagar', 'JP Nagar']),
    check("phoneNumber", "Phone number is required and must be unique").isNumeric().notEmpty().custom(async (value, { req }) => {
        const existingUser = await User.findOne({ phoneNumber: value });
        if (existingUser) {
            throw new Error("Phone number already exists");
        }
    })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }
        user = new User(req.body);
        const newUser = await user.save();
        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
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
            phoneNumber: newUser.phoneNumber
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
