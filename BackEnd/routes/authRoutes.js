import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import "dotenv/config";
import {v4 as uuidv4} from "uuid";

const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
    const { type, name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new User({id: uuidv4(),  type, name, email, password });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user: { id: user._id, type: user.type, name: user.name, email: user.email } });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
});

export default router;