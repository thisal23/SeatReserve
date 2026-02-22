import Remaining from "../models/availableSeats.js";
import Stations from "../models/stoppingStations.js";
import Booking from "../models/bookings.js";

const stationList = async (req,res)=>{
    const {turn_No} = req.params;
    try{
        const list = await Stations.find({turn_No}).sort({sDeparture:1});
        if(!list || list.length === 0 ){
            return res.status(400).json({message:"Can't find Stations!"});
        }
        res.status(200).json({message:"Station list Fetched..." , data:list});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}

const getBookingsWithRemaining = async (req, res) => {
  try {
    const bookings = await Booking.aggregate([
      {
        $lookup: {
          from: "remainings", // collection name in MongoDB
          let: {
            turn: "$turn_No",
            date: "$travel_Date",
            tClass: "$tClass",
            comp: "$compartment"
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$turn_No", "$$turn"] },
                    { $eq: ["$travel_Date", "$$date"] },
                    { $eq: ["$tClass", "$$tClass"] },
                    { $eq: ["$compartment", "$$comp"] }
                  ]
                }
              }
            }
          ],
          as: "remainingInfo"
        }
      },
      { $unwind: "$remainingInfo" } // optional
    ]);

    res.status(200).json({ message: "Bookings with remaining seats", data: bookings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const searchSeats = async(req,res)=>{
    const {turn_No,
            from,
            to,
        travel_Date,
        // passengers
    } = req.params;
    try{
        const date= new Date(travel_Date);
        date.setUTCHours(0,0,0,0);

        const bookings = await Booking.aggregate([
            {
                $match:{
                    turn_No,
                    travel_Date:date,
                    // from,
                    // to
                }},
      {
        $lookup: {
          from: "remainings", // collection name in MongoDB
          let: {
            turn: "$turn_No",
            date: "$travel_Date",
            tClass: "$tClass",
            comp: "$compartment"
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$turn_No", "$$turn"] },
                    { $eq: ["$travel_Date", "$$date"] },
                    { $eq: ["$tClass", "$$tClass"] },
                    { $eq: ["$compartment", "$$comp"] }
                  ]
                }
              }
            }
          ],
          as: "remainingInfo"
        }
      },
      { $unwind: "$remainingInfo" } // optional
    ]);

        
        if(!bookings || bookings.length ===0){
            return res.status(400).json({message:"Cannot fetch Seat remaining..."})
        }

        res.status(200).json({message:"Available seats fetched..." ,data: bookings});

    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}

export {stationList, searchSeats ,getBookingsWithRemaining};