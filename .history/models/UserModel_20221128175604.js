import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    isAdmin:{
        type:Boolean,
        require:true,
        default:false
    }
},
{
    timestamps:true
}
)

//Login
userSchema.methods.matchPassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword, this.password)
}
const User = mongoose.model("User", userSchema);
export default User;