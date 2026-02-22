import express from 'express';
import {searchSeats, stationList} from '../controller/searchController.js';

const router = express.Router();

router.get('/list/:turn_No', stationList);
router.get('/remaining/:turn_No/:travel_Date/:from/:to', searchSeats );

export default router;