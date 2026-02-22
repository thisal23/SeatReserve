import express from 'express'
import calculateFares from '../controller/faresCalculatingController.js';

const router = express.Router();

router.get("/fare/:turn_No/:tClass/:sectionS/:sectionE", calculateFares)

export default router;