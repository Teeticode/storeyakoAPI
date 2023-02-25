import express from 'express';
import multer from "multer";
import path from "path"
import fs from 'fs'

//image upload
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, 'Images')
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
    
    try{
        const file = fs.readFileSync(req.file.path)
        console.log(file)
        res.status(201).json({'success':file})
    }catch(error){
        res.status(400).send(error.message)
    }
})

export default imageRouter;