/*const passport = require('passport')
 const LocalStrategy = require('passport-local').Strategy;
 const Person = require('./models/Person')


localAuthMiddleware = passport.authenticate('local',{session:false})
passport.use(new LocalStrategy(async(USERNAME,password,done)=>{
    //authentication logic here
    try{
console.log("recieved credential");
const user = await  Person.findOne({username: USERNAME})
if(!user)
    return done(null,false, {message: 'incorrect username.' })
const isPasswordMatch = await user.comparePassword(password)
if(isPasswordMatch){
    return done(null,user)
}else{
    return done (null, false, {message:'incorrect password'})
}

    }catch(err){
return done (err)
    }
}))

module.exports = passport; */
const passport = require('passport');
 const localStrategy = require('passport-local');
const Person = require('./models/Person');

//authentication function
passport.use(new localStrategy( async (username,password,done)=>{
    try{
   // console.log("username :", username, "password :", password)
  const response = await  Person.findOne({username:username});
  if(!response){
    return done(null, false , {messege : "user not found"});
  }else{
 const passwordCheck = await response.comparePassword(password);
  if(passwordCheck){
    return done(null,response)
  }else{
    return done (null ,false, {messege : "password not matched"})
  }
  }}
    catch(err){
     return done(err)
    }
}))
module.exports = passport;