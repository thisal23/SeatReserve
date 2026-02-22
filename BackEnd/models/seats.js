import mongoose from "mongoose";
import Remaining from "./availableSeats.js";
import Section from "./section.js";

const seats = new mongoose.Schema({
    turn_No: {type:String,required:true},
    tClass: {type:String,required:true},
    compartment: {type:String, required:true},
    seatsCount : {type:Number, required:true}
    
});

seats.index({turn_No:1, tClass:1, compartment:1},{unique:true});

seats.post("save", async function(doc){
    try{
        const sections = await Section.find();

        if (!sections || sections.length === 0) {
            console.log("No sections found. Skipping Remaining creation.");
            return;
            }
        const today = new Date();
        for(const sec of sections){
            let i=1;
            while(i<=30){
                const nextDate = new Date(Date.UTC(
                    today.getUTCFullYear(),
                    today.getUTCMonth(),
                    today.getUTCDate() + i,
                    0, 0, 0, 0
                ));

                
                await Remaining.findOneAndUpdate({
                turn_No: doc.turn_No,
                tClass: doc.tClass,
                compartment: doc.compartment,
                travel_Date: nextDate,
                sectionS:sec.sectionS ,
                sectionE: sec.sectionE
            },
            {
                remaining: doc.seatsCount
            },
            {
                upsert: true,
                new: true
            }
            );
            i++;
            }
            }
            
        
            }
        catch(err){
            console.log(err);
        }
        }
)

const Seats = mongoose.model('Seats', seats);

export default Seats;