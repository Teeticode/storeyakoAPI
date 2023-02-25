import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    }
})