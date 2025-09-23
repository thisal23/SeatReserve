import express from "express";
import User from "../models/user.js";
import "dotenv/config";
import {v4 as uuidv4} from "uuid";

const Register = async (req, res) => {
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
}

export default Register;