const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    image:{
        type:String
    },
    store:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Business'
    }

},{
    timestamps:true
})

const Comment = mongoose.model("Comment",CommentSchema)
module.exports = Comment