import mongoose from "mongoose";
import Section from "./section.js";

const sStations = new mongoose.Schema({
    turn_No: {type:String , required:true},
    sName: {type:String , required:true},
    sArrival : {type:String , required:true},
    sDeparture: {type:String , required:true},
    order:{ type:Number, required: true},
    sectionS:{type:String, required:true},
    sectionE:{type:String, required:true}


});

sStations.index({turn_No:1, sName:1}, {unique:true});

sStations.post("save" , async function(doc) {
    try{
        const check = await Section.findOne({
            sectionS: doc.sectionS,
            sectionE: doc.sectionE
        });
        if(!check){
            const random = Math.random().toString(36).substring(2,8).toUpperCase();
            const sec_Id = `S-${random}`;
            const addNewSection = new Section({sec_Id, sectionS:doc.sectionS, sectionE: doc.sectionE});
            await addNewSection.save(); 
        }
    }
    catch(err){
        console.log(err);
    }
})
const Stations = mongoose.model("StationsList", sStations);

export default Stations;