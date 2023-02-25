import mongoose from "mongoose";
import express from 'express'
import ExpressAsyncHandler from 'express-async-handler'
import User from "../models/UserModel.js";
import bcryptjs from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()
const userRouter = express.Router()

userRouter.get('/', (req,res)=>{
    User.find({}).select("username email isAdmin")
    .then((users)=>{
        res.status(200).json(users)
    }).catch((err)=>{
        return res.status(500).json({error:'something went wrong'})
    })
})

userRouter.get('/:id', (req,res)=>{
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(500).json({error:'The id is invalid'})
    }
    User.findById(req.params.id).select('username email isAdmin')
    .then((user)=>{
        if(user){
            res.status(200).json(user)
        }else{
            res.status(404).json({'error':`user of id ${req.params.id} was not found`})
        }
        
    }).catch((err)=>{
        return res.status(500).json({error:"something went wrong"})
    })
})

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
                                    error:'Account was not created !',
                                    success: false
                                })
                            })
                        }).catch((err)=>{
                            return res.status(500).json({error:'something went wrong'})
                        })
                    }
                }).catch(err=>{
                    return res.status(500).json({error:'something went wrong'})
                })
            }
        }).catch(err=>{
            return res.status(500).json({error:'something went wrong'})
        })
        
    }
)

userRouter.post('/login', (req,res)=>{
    if(!req.body.password || !req.body.email ){
        return res.status(500).json({
            error:'fill in all fields please'
        })
    }
    const email = req.body.email 
    User.findOne({email:email.toLowerCase()})
    .then((user)=>{
        if(user){
            bcryptjs.compare(req.body.password, user.password)
            .then((verifieduser)=>{
                if(verifieduser){
                    const token = jwt.sign({
                        userId:user.id,
                        username:user.username
                    },
                    process.env.TOKEN_SECRET
                    )
                    return res.status(200).json(user)
                }else{
                    return res.status(404).json({error:"Invalid Credentials"})
                }
            }).catch((err)=>{
                return res.status(500).json({error:'something went wrong'})
            })
        }else{
            return res.status(404).json({error:'User does not exist'})
        }
    }).catch((err)=>{
        return res.status(500).json({error:'something went wrong'})
    })
})

export default userRouter;