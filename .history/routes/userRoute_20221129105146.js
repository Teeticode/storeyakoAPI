import mongoose from "mongoose";
import express from 'express'
import ExpressAsyncHandler from 'express-async-handler'
import User from "../models/UserModel.js";


const userRouter = express.Router()

userRouter.post('/signup',
    (req,res)=>{
        if(!req.body.username || !req.body.password || !req.body.email || !req.body.isAdmin){
            return res.status(500).json({
                error:'fill in all fields please'
            })
        }
        User.findOne({username:req.body.username})
        .then((user)=>{
            res.status(401).json({
                error:'username is already taken'
            })
        })
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            isAdmin: req.body.isAdmin
        });
        
        user.save()
        .then((user)=>{
            res.status(200).json(user)
        })
        .catch((err)=>{
            res.status(500).json({
                error:'Account not created',
                success: false
            })
        })
    }
)

export default userRouter;