import express from "express";
import {addStation, addTrain, updateTrain, addFares, updateStation, updateFares, updateSeats, addSeats} from '../controller/manageController.js';

const router = express.Router();

//addTrain Route
router.post("/train" , addTrain);
router.post("/stations", addStation);
router.post("/updateTrain", updateTrain );
router.post("/updateStation", updateStation);
router.post("/fares", addFares);
router.post("/updateFares", updateFares);
router.post("/updateSeats", updateSeats);
router.post("/addSeats", addSeats);

export default router;