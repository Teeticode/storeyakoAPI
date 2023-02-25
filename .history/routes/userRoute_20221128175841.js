import mongoose from "mongoose";
import express from 'express'
import ExpressAsyncHandler from 'express-async-handler'
import User from "../models/UserModel";

const userRouter = express.Router()

userRouter.post('/login',ExpressAsyncHandler(
    async(req,res)=>{
        const {email,password} = req.body
        const user = await User.findOne({email})
        if(user && (await user.matchPassword(password))){
            res.json({
                _id:user._id,
                username:user.username,
                email:user.email,
                isAdmin:user.isAdmin
            })
        }
    }
))

export default userRouter;