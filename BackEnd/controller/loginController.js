import express from 'express';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
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
}

export default Login;