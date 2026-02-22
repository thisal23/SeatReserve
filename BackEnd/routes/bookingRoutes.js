import express from 'express';
import { addBooking, searchBooking,searchBookedSeats } from '../controller/bookingController.js';

const router = express.Router();

router.post('/addBooking', addBooking);
router.get(`/searchBooking/:turn_No/:date/:from/:to`, searchBooking);
router.get(`/searchBookedSeats/:turn_No/:tClass/:compartment/:travel_Date/:sectionS/:sectionE`, searchBookedSeats);


export default router;