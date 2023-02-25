import express from 'express';
import dotenv from 'dotenv'
import connectDatabase from './config/MongoDb.js';
import productRoute from './routes/productRoute.js';
import userRouter from './routes/userRoute.js';
import bodyParser from "body-parser";
import morgan from 'morgan';
import cors from 'cors';
import categoryRouter from './routes/categoryRoute.js';
import businessRouter from './routes/businessRoute.js';
import path from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
import imageRouter from './routes/imagesRoute.js';
const app = express();
app.use(cors());
app.options('*', cors())
dotenv.config();
connectDatabase();

const PORT = process.env.PORT;
const api = process.env.URL;
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(`${api}products`, productRoute);
app.use(`${api}users`, userRouter);
app.use(`${api}categories`, categoryRouter);
app.use(`${api}businesses`, businessRouter,express.static(path.join(__dirname, 'Images')));
app.use(`${api}images`, express.static(path.join(__dirname, 'Images')))
app.use(`${api}images`, imageRouter)
app.get(`${api}`,(req,res)=>{
    return res.status(200).json({status:true})
})

app.listen(PORT,console.log(`server running on port ${PORT}..`))
