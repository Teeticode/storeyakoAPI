import express from 'express';
import multer from "multer";
import path from "path"
import fs from 'fs'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
//image upload
const folder = path.join(__dirname,'Images')
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        if(fs.existsSync(folder)){
            cb(null, 'Images')
        }else{
            fs.mkdirSync(folder)
            cb(null, 'Images')
        }
    },
    filename:(req,file,cb)=>{
        cb(null, file.fieldname+'-'+Date.now()+file.originalname)
    }
})

const filefilter = (req,file,cb)=>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null,false)
    }else{
        cb(null,true)
    }
}
const upload = multer({storage:storage}).single('image');

const imageRouter = express.Router()



imageRouter.post('/',upload,(req,res)=>{
    console.log(folder)
    try{
        const file = req.file.filename
        res.status(201).json({'success':file})
    }catch(error){
        res.status(400).send(error.message)
    }
})





export default imageRouter;