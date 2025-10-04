import mongoose from "mongoose";

const faresMatrix = new mongoose.Schema({
    turn_No: {type:String, required:true},
    tClass: {type:String, required:true},
    fares: {type:Object , required:true}
});

faresMatrix.index({turn_No:1, tclass:1}, {unique:true});

const FaresMatrix = mongoose.model("FaresMatrix", faresMatrix);

export default FaresMatrix;