const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

dotenv.config();

function verifyBiz(req,res,next){
    try{
        const tokenbiz = req.headers.Authorization.split(' ')[1];
        const decodedToken = jwt.verify(tokenbiz,process.env.TOKEN_SECRET_BIZ)
        const bizId = decodedToken.bizId;
        const userId = decodedToken.userId
    
        if(req.body.bizId&& req.body.userId && req.body.userId!==userId && req.body.bizId !== bizId){
            res.status(401).json({
                error: 'something went wrong'
            })
        }else{
            req.biz = bizId;
            req.user = userId
            next();
        }
    }catch{
        res.status(401).json({
            error: 'something went wrong'
        })
    }
}
module.exports = verifyBiz;