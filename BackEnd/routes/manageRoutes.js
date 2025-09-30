import express from "express";
import addTrain from '../controller/manageController.js';

const router = express.Router();

//addTrain Route
router.post("/train" , addTrain);

export default router;