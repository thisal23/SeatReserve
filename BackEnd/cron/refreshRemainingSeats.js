import cron from "node-cron";
import Seats from "../models/seats.js";
import Remaining from "../models/availableSeats.js";
import StationsList from "../models/stoppingStations.js";
import e from "express";

// Runs every day at midnight
const refreshRemainingSeats = async () => {
  try {
    const seatsList = await Seats.find();
    

    const today = new Date();
    const newDate = new Date(today);
    newDate.setDate(today.getDate()+ 30); // create remaining seats 30 days ahead
    const dateOnly = newDate.toISOString().split('T')[0];

    for (const seat of seatsList) {
      const stationsList = await StationsList.find(
        {
          turn_No: seat.turn_No,
          
        }
      );
      for (const station of stationsList) {
      if(station.sectionS!= station.sectionE){

        await Remaining.findOneAndUpdate(
          {
            turn_No: seat.turn_No,
            tClass: seat.tClass,
            compartment: seat.compartment,
            travel_Date: dateOnly,
            sectionS: station.sectionS,
            sectionE: station.sectionE
          },
          { remaining: seat.seatsCount },
          { upsert: true, new: true }
        );
      }
    }
      }
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    await Remaining.deleteMany({ travel_Date: { $lt: todayStart } });


    console.log("Remaining seats added for next 30 days.");
  } catch (err) {
    console.error("Error refreshing remaining seats:", err);
  }
}
;


// refreshRemainingSeats();
 // Initial call to populate remaining seats immediately
cron.schedule("0 0 * * *", refreshRemainingSeats);

export default refreshRemainingSeats;