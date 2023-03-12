const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

dotenv.config();

function verifyUser(req,res,next){
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token,process.env.TOKEN_SECRET)
        const userId = decodedToken.userId;
        const isAdmin = decodedToken.isAdmin;
    
        if(req.body.userId && req.body.userId !== userId || req.body.isAdmin && req.body.isAdmin !== isAdmin){
            res.status(401).json({
                error: 'something went wrong'
            })
        }else{
            req.user = userId;
            req.isAdmin = isAdmin;
            next();
        }
    }catch{
        res.status(401).json({
            error: 'something went wrong'
        })
    }
}
module.exports = verifyUser;