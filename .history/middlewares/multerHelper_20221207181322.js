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
        if(fs.existsSync('Images')){
            cb(null, 'Images')
        }else{
            fs.mkdirSync('Images')
            cb(null, 'Images')
        }
    },
    filename:(req,file,cb)=>{
        const savedfile = file.fieldname+'-'+Date.now()+(file.originalname).split(' ').join('')
        cb(null, savedfile)
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

export default upload