import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    id: {type:String, required:true},
    type: {type:String, required:true},
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true}
});

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        return next();
    }
    this.password=await bcrypt.hash(this.password, 10); 
    next();
});

userSchema.methods.comparePassword = async function(cpassword) {
    return await bcrypt.compare(cpassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;