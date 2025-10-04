import mongoose from "mongoose";

const sStations = new mongoose.Schema({
    turn_No: {type:String , required:true},
    sName: {type:String , required:true},
    sArrival : {type:String , required:true},
    sDeparture: {type:String , required:true}


});

sStations.index({turn_No:1, sName:1}, {unique:true});

const Stations = mongoose.model("StationsList", sStations);

export default Stations;