/*const jwt = require('jsonwebtoken')

const jwtAuthMiddleware = (req,res,next)=>{
   //first check request headers has authorized or not 
   const authorization = req.headers.authorization
   if (!authorization) return res.status(401).json({error: 'token not found'})


    //extract the jwt token from the request headers
    const token = req.headers.authorization.split('')[1];
    if(!token) return res.status(401).json({error :'unauthorized'});

    try{
        // verify the jwt token 
        const decoded =jwt.verify(token,process.env.JWT_SECRET)

        req.user = decoded
        next()
    }catch(err){
        console.log(err)
        res.status(401).json({error:'invalid token'})}
    }


const generateToken = (userData)=>{
    return jwt.sign(userData,process.env.JWT_SECRET);
}

module.exports = {jwtAuthMiddleware, generateToken}*/