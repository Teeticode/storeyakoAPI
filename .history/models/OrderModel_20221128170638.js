import mongoose from "mongoose";


const orderSchema = mongoose.Schema({
    user:{
        ref:"User",
        type:mongoose.Schema.Types.ObjectId,
        require:true
    },
    orderItems: [
        {
            name:{type:String, require:true},
            qty:{type:Number, require:true},
            image:{type:String, require:true},
            price:{type:Number, require:true},
            product:{
                type:mongoose.Schema.Types.ObjectId,
                require:true,
                ref:"Product"
            }
        }
    ]
},
{
    timestamps:true
}
)

const Order = mongoose.model("Order", orderSchema);
export default Order;