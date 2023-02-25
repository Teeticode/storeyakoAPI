import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    },
    token:{
        type:String,
        default:null
    }
},
{
    timestamps:true
}
)

userSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals:true
})
//Login
userSchema.methods.matchPassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword, this.password)
}
const User = mongoose.model("User", userSchema);
export default User;