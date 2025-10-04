import mongoose from "mongoose";

const bookings = new mongoose.Schema({
    booking_Id:{type:String, required:true},
    seat_No: {type:String, required:true},
    turn_No: {type:mongoose.Schema.Types.ObjectId, ref:"Train", required:true},
    from: {type:mongoose.Schema.Types.ObjectId, ref:"StationsList", required:true},
   
    to: {type:mongoose.Schema.Types.ObjectId, ref:"StationsList", required:true},
    travel_Date: {type:Date, required:true},
    booking_Date:{type:Date, default:Date.now},
    status: {type:String, enum:["booked", "cancelled"], default:"booked"},
    price:{type:Number, required:true}
});

bookings.index({turn_No:1, seat_No:1,travel_Date:1}, {unique:true});

const Booking = mongoose.model("Booking", bookings);

export default Booking;