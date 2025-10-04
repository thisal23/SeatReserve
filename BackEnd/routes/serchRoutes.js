import express from 'express';
import stationList from '../controller/searchController.js';

const router = express.Router();

router.get('/list/:turn_No', stationList);

export default router;