import mongoose from "mongoose";
import express from 'express'
import ExpressAsyncHandler from 'express-async-handler'
import User from "../models/UserModel.js";


const userRouter = express.Router()

userRouter.post('/signup',
    (req,res)=>{
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            isAdmin: req.body.isAdmin
        })
    }
)

export default userRouter;