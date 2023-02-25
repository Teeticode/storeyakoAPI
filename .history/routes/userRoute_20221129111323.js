import mongoose from "mongoose";
import express from 'express'
import ExpressAsyncHandler from 'express-async-handler'
import User from "../models/UserModel.js";
import bcryptjs from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()
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
            if(user){
                return res.status(401).json({
                    error:'Username is already taken'
                })
            }else{
                User.findOne({email:req.body.email})
                .then((userEmail)=>{
                    if(userEmail){
                       return res.status(401).json({
                            error:'Email is already taken'
                        })
                    }else{
                        bcryptjs.hash(req.body.password,10)
                        .then((hashedPsd)=>{
                            const user = new User({
                                username: req.body.username,
                                password: hashedPsd,
                                email: req.body.email,
                                isAdmin: req.body.isAdmin
                            });
                            
                            user.save()
                            .then((user)=>{
                                return res.status(200).json(user)
                            })
                            .catch((err)=>{
                                return res.status(500).json({
                                    error:err,
                                    success: false
                                })
                            })
                        }).catch((err)=>{
                            return res.status(500).json({error:err})
                        })
                        
                    }
                }).catch(err=>{
                    return res.status(500).json({error:'something went wrong in email'})
                })
            }
        }).catch(err=>{
            return res.status(500).json({error:'something went wrong in username'})
        })
        
    }
)

export default userRouter;