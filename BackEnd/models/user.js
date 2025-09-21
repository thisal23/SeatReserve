import mongoose from "mongoose";

const userSChema = new mongoose.Schema({
    id: {type:String, required:true, unique:true},
    type: {type:String, required:true},
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true}
})

const user = mongoose.model("user", userSChema);

export default user;