const express = require('express')
const dotenv = require('dotenv');
const connectDatabase = require('./config/MongoDb.js');
const productRoute = require('./routes/productRoute.js');
const userRouter = require('./routes/userRoute.js');
const morgan = require('morgan');
const cors = require('cors');
const categoryRouter = require('./routes/categoryRoute.js');
const businessRouter = require('./routes/businessRoute.js');
const path = require('path')
const {fileURLToPath} = require('url')


const app = express();
app.use(cors());
app.options('*', cors())
dotenv.config();
connectDatabase();

const PORT = process.env.PORT;
const api = process.env.URL;
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(`${api}products`, productRoute);
app.use(`${api}users`, userRouter);
app.use(`${api}categories`, categoryRouter);
app.use(`${api}businesses`, businessRouter,express.static(path.join(__dirname, 'Images')));

app.get(`${api}`,(req,res)=>{
    return res.status(200).json({status:true})
})

app.listen(PORT,console.log(`server running on port ${PORT}..`))
