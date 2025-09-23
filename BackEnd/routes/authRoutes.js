import express from "express";
import "dotenv/config";
import Register from "../controller/registerController.js";
import Login from "../controller/loginController.js";

const router = express.Router();

// Register Route
router.post("/register",Register );

// Login Route
router.post("/login",Login );

export default router;