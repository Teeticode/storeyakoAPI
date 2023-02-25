import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

function verifyUser(req,res,next){
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token,process.env.TOKEN_SECRET)
        const userId = decodedToken.userId;
        if(req.body.userId && req.body.userId !== userId){
            res.status(401).json({
                error: 'something went wrong'
            })
        }else{
            next();
        }
    }catch{
        res.status(401).json({
            error: 'something went wrong'
        })
    }
}
export default verifyUser;