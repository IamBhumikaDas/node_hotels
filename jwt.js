

const jwt = require('jsonwebtoken')
require('dotenv').config();

const jwtMiddleware =(req,res,next)=>{

 const auth= req.headers.authorization

 if(!auth){
    return res.status(404).json({error:'token not found'})
 }

 const token =req.headers.authorization.split(' ')[1];
 if(!token) return res.status(401).json({error :"unauthorized"})

    try{
      const decode =  jwt.verify(token,process.env.JWT_SECRET_KEY);

      req.user = decode;
      next();

    }catch(err){
        console.log(err)
        return res.status(401).json({error :"internal server error"})
    }
}

const jwt_token_generate =(userdata)=>{
 return jwt.sign(userdata,process.env.JWT_SECRET_KEY,{expiresIn:3000})
}

module.exports ={ jwtMiddleware ,jwt_token_generate };