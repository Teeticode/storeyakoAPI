const mongoose = require('mongoose')
const User = require('./UserModel')
const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type: Number,
        required:true,
        default:0
    },
    image:{
        type:String
    },
    countInStock:{
        type:Number,
        required:true,
        default:0
    },
    isDiscount:{
        type:Boolean,
        required:true,
        default:false
    },
    isFeatured:{
        type:Boolean,
        required:true,
        default:false
    },
    reviews:[{
        rating:{
            type:Number,
            default:0
        },
        comments:{
            type:String,
            
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            
        }
    }],
    category:{
        type:Object,
        required:true
    }
},
{
    timestamps:true
}
)
productSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

productSchema.set('toJSON', {
    virtuals:true
})
const Product = mongoose.model("Product", productSchema);
module.exports = Product;