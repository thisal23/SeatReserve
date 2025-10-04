import express from "express";
import {addStation, addTrain, updateTrain, addFares, updateStation, updateFares} from '../controller/manageController.js';

const router = express.Router();

//addTrain Route
router.post("/train" , addTrain);
router.post("/stations", addStation);
router.post("/updateTrain", updateTrain );
router.post("/updateStation", updateStation);
router.post("/fares", addFares);
router.post("/updateFares", updateFares);
export default router;