import express from "express";
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import User from "../models/users.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", [
    check("email", "Email field is required").isEmail(),
    check("password", "Password with 6 or more characters is required").isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials!" });
        }
        
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" }); //setup cookie
        res.cookie("auth", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000
        });
        
        // Return user details on successful login
        return res.status(200).json({
            _id: user._id,
            email: user.email,
            name: user.name,
            isWorker: user.isWorker,
            location: user.location,
            phoneNumber: user.phoneNumber
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post("/logout", (req, res) => {
    res.cookie("auth","", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expiresIn:new Date(1),
    });
    res.status(200).json({
        message: "Successfully logged out"
    });
});

export default router;
