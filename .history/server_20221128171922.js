import express from 'express';
import dotenv from 'dotenv'
import connectDatabase from './config/MongoDb.js';
import productRoute from './routes/productRoute.js';
dotenv.config();
connectDatabase();
const app = express();
const PORT = process.env.PORT
app.use('/api/v1/products', productRoute)
app.get("/",(req,res)=>{
    res.send("API is running")
})

app.listen(PORT,console.log(`server running on port ${PORT}..`))
