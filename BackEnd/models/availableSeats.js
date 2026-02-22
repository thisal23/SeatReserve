// import mongoose from "mongoose";

// const remainingSeats = new mongoose.Schema({
//     turn_No:{type:String, required:true},
//     travel_Date: {type:Date, required:true},
//     tClass:{type:String, required:true},
//     seatsCount:{type:mongoose.Schema.Types.ObjectId,ref:"Seats" , required:true },
//     remaining:{type:Number, required:true, default:function(){return this.seatsCount;}}

// });


// remainingSeats.index({turn_No:1,travel_Date:1,tClass:1}, {unique:true});

// const Remaining = mongoose.model("Remaining", remainingSeats);

// export default Remaining;

import mongoose from "mongoose";
import Seats from "./seats.js";  

const remainingSeatsSchema = new mongoose.Schema({
  turn_No: { type: String, required: true },
  travel_Date: { type: Date, required: true },
  tClass: { type: String, required: true },
  compartment: { type: String, required: true },
  remaining: { type: Number, default: 0 },
  sectionS:{type:String, required:true},
  sectionE:{type:String, required:true}

});


remainingSeatsSchema.pre("save", async function (next) {
  if (this.remaining === 0) {
    const seatData = await Seats.findOne({
      turn_No: this.turn_No,
      tClass: this.tClass,
      compartment: this.compartment
    });

    if (seatData) {
      this.remaining = seatData?.seatsCount; 
    }
  }
  next();
});

remainingSeatsSchema.index(
  { turn_No: 1, travel_Date: 1, tClass: 1, compartment: 1,sectionS:1, sectionE:1 },
  { unique: true }
);

const Remaining = mongoose.model("Remaining", remainingSeatsSchema);
export default Remaining;
