import express from 'express';
import dotenv from 'dotenv'
import connectDatabase from './config/MongoDb.js';
import productRoute from './routes/productRoute.js';
import userRouter from './routes/userRoute.js';
import bodyParser from "body-parser";
import morgan from 'morgan';
import cors from 'cors';
import categoryRouter from './routes/categoryRoute.js';

const app = express();
app.use(cors());
app.options('*', cors())
dotenv.config();
connectDatabase();

const PORT = process.env.PORT;
const api = process.env.URL;
app.use(morgan('tiny'));
app.use(bodyParser.json());

app.use(`${api}products`, productRoute);
app.use(`${api}users`, userRouter);
app.use(`${api}categories`, categoryRouter);

app.get("/",(req,res)=>{
    res.send("API is running");
})

app.listen(PORT,console.log(`server running on port ${PORT}..`))
