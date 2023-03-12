const mongoose = require('mongoose')
const User = require('./UserModel')
const businessSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    }
},
{
    timestamps:true
})

businessSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

businessSchema.set('toJSON', {
    virtuals:true
})

const Business = mongoose.model("Business", businessSchema)
module.exports = Business
