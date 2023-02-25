import express from 'express';
import dotenv from 'dotenv'
import connectDatabase from './config/MongoDb.js';
import productRoute from './routes/productRoute.js';
import userRouter from './routes/userRoute.js';
import bodyParser from "body-parser";
import morgan from 'morgan';

dotenv.config();
connectDatabase();
const app = express();
const PORT = process.env.PORT;
const api = process.env.URL;
app.use(express.json());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(`${api}products`, productRoute);
app.use(`${api}users`, userRouter);

app.get("/",(req,res)=>{
    res.send("API is running");
})

app.listen(PORT,console.log(`server running on port ${PORT}..`))
