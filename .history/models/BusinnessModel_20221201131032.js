import mongoose from "mongoose";

const businessSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
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
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }]
})

businessSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

businessSchema.set('toJSON', {
    virtuals:true
})

const Business = mongoose.model("Business", businessSchema)
export default Business
