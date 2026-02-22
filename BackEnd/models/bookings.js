import mongoose from "mongoose";
import Remaining from "./availableSeats.js";

const bookings = new mongoose.Schema({
    booking_Id:{type:String, unique:true},
    seat_No: {type:String, required:true},
    turn_No: {type:String, required:true},
    tClass : {type:String, required:true},
    compartment: {type:String, required:true},
    from: {type:String, required:true},
    to: {type:String, required:true},
    travel_Date: {type:Date, required:true},
    booking_Date:{type:Date, default:Date.now},
    status: {type:String, enum:["booked", "cancelled" ], default:"booked"},
    sectionS:{type:String, required:true},
    sectionE:{type:String, required:true},
    price:{type:Number, required:true}
});

bookings.index({turn_No:1, seat_No:1,travel_Date:1,sectionS:1,sectionE:1}, {unique:true});



const Booking = mongoose.model("Booking", bookings);

export default Booking;