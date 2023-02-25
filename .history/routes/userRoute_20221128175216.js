import mongoose from "mongoose";
import express from 'express'
import ExpressAsyncHandler from 'express-async-handler'

const userRouter = express.Router()

userRouter.post('/login',ExpressAsyncHandler(
    async(req,res)=>{

    }
))

export default userRouter;