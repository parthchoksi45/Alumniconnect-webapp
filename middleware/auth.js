const jwt= require('jsonwebtoken')

const config = require('config');

//A middleware function is basically a function which
//has access to request and response cycle

module.exports = function(req,res,next){

    //get token from header
    const token=req.header('x-auth-token');

    //check if not token

    if(!token){
        return res.status(401).json({
            msg:'No token, authorization denied'
        });
    }

    //verify token

    try{

        const decoded=jwt.verify(token,config.get('jwtSecret'));
        req.user=decoded.user;
        next();

    }
    catch{
        res.status(401).json({msg:"token not valid"});
    }
}