import mongoose from "mongoose";
import express from 'express'
import ExpressAsyncHandler from 'express-async-handler'
import User from "../models/UserModel.js";

const userRouter = express.Router()

userRouter.post('/login',ExpressAsyncHandler(
    async(req,res)=>{
            const {email,password} = req.body
            if(!email || !password){
                return res.status(402).json({error:'fill all fields'})
            }
            const user = await User.findOne({email})
            
            if(user && (await user.matchPassword(password))){
                res.json({
                    _id:user._id,
                    username:user.username,
                    email:user.email,
                    isAdmin:user.isAdmin,
                    token: null,
                    createdAt: user.createdAt
                })
            }else{
                res.status(401).json({error:'Invalid credentials'})
            }
        
    }
))

export default userRouter;