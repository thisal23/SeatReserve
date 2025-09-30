import mongoose from "mongoose";

const trainList = new mongoose.Schema({
    line: {type:String, required: true},
    turn_No: {type:String , required: true, unique:true},
    name: {type:String, required:true},
    from: {type:String, required:true},
    to: {type:String, required:true},
    departure: {type:String, required : true}
});

const TrainList = mongoose.model("Train" , trainList);

export default TrainList;