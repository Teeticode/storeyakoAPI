import mongoose from "mongoose";
import express from 'express'
import ExpressAsyncHandler from 'express-async-handler'
import User from "../models/UserModel.js";

const userRouter = express.Router()

userRouter.post('/login',ExpressAsyncHandler(
    async(req,res)=>{
        if(req.body == null){
            res.status(422).json({error:'empty'})
        }else{
            const {email,password} = req.body
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
        
    }
))

export default userRouter;