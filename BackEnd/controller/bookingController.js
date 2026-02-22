import mongoose from "mongoose";
import Remaining from "../models/availableSeats.js";
import Booking from "../models/bookings.js";
import StationsList from "../models/stoppingStations.js";
import Section from "../models/section.js";

// const setSection = async (req,res)=>{
//     const {turn_No,from, to} = req.body;
//     try{
//         const stationList = await StationsList.findOne({turn_No});
//         if(!stationList){
//             return res.status(400).json({message:"Invalid turn number"});
//         }
//         const fromIndex= stationList.order;
//         const toIndex = stationList.order;
//         if(fromIndex === toIndex){
//             return res.status(400).json({message:"From and To stations cannot be the same"});
//         }
//         const sectionList = await Section.find();
//         const sectionSIndex= sectionList.sectionS
//         const sectionS = fromIndex < toIndex ? stationList.sectionS : stationList.sectionE;
//     }
// }
const searchBookedSeats = async(req,res)=>{
    const {turn_No,
        tClass,
        compartment,
        travel_Date,
        sectionS,
        sectionE,
    }= req.params;
    try{
        const bookedSeat = await Booking.find({turn_No,tClass,compartment,travel_Date,sectionS,sectionE,status:"booked"});
        if(bookedSeat){
            return res.status(200).json({message:"Displaying booked seats", data: bookedSeat});
        }
        return res.status(400).json({message:"Available"});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

const searchBooking = async(req,res)=> {
    const turn_No = req.params.turn_No;
    const travel_Date = req.params.date;
    const sectionS = req.params.from;
    const sectionE = req.params.to;
    
    const status= "booked";
    const startDate = new Date(travel_Date);
    startDate.setUTCHours(0, 0, 0, 0);
    const endDate = new Date(travel_Date);
    endDate.setUTCHours(23, 59, 59, 999);

    try{
        // console.log(turn_No, startDate,endDate, sectionS, sectionE);
        const searchSeat= await Remaining.find({turn_No,
            travel_Date:{
                $gte: startDate, 
                $lte: endDate
            },
            sectionS,sectionE});
        if(searchSeat.length > 0){
            res.status(200).json({message: "available", data: searchSeat});
            // console.log(searchSeat);
        }
        return res.status(400).json({message:"Already booked!"});

        
    }
    catch(err){
        res.status(500).json({message: err.message});
    }

}


const addBooking = async (req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();

    const {seats,
        turn_No,
        tClass,
        compartment,
        from,
        to,
        travel_Date,
        sectionS,
        sectionE,
        price
    } = req.body;
    try{
        console.log(seats);
        console.log("Is Array:", Array.isArray(seats));
        const travelDate = new Date(travel_Date);
        travelDate.setUTCHours(0, 0, 0, 0);
        const status = "booked";
        const booking_Date = new Date();

        for(let seat of seats){
            const searchSeat= await Booking.findOne({turn_No,tClass,compartment,seat_No:seat,travel_Date:travelDate,sectionS,sectionE,status}).session(session);
            if(searchSeat){
                throw new Error("Already booked!");
                }
        
       
        const updated = await Remaining.findOneAndUpdate({turn_No,tClass,compartment,travel_Date:travelDate,sectionS,sectionE, remaining:{$gte:1}},
                {$inc:{remaining: -1}},
                {new:true, session}
            );
            if(!updated || updated.remaining < 0){
                throw new Error( "No remaining seats available" );
            }
        
        
        const random = Math.random().toString(36).substring(2,8).toUpperCase();
        const timeStamp = Date.now().toString().slice(-4);
        const booking_Id = `BK-${timeStamp}-${random}`;
        const statusNew = 'booked';
 
        
            console.log(seat);
            const add = new Booking({booking_Id,seat_No:seat,turn_No,tClass,compartment,from, to,travel_Date:travelDate,booking_Date:new Date(),status:statusNew,sectionS,sectionE,price});
            await add.save({session});
        }
        await session.commitTransaction();
        session.endSession();
        res.status(200).json({message:"Booking done"});
        
    }
    catch(err){
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({message: err.message});
    }
}

export {addBooking, searchBooking, searchBookedSeats};