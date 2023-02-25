import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

function verifyBiz(req,res,next){
    try{
        const tokenbiz = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(tokenbiz,process.env.TOKEN_SECRET)
        const bizId = decodedToken.bizId;
    
        if(req.body.bizId && req.body.bizId !== bizId){
            res.status(401).json({
                error: 'something went wrong'
            })
        }else{
            req.biz = bizId;
            next();
        }
    }catch{
        res.status(401).json({
            error: 'something went wrong'
        })
    }
}
export default verifyBiz;