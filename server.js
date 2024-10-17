
/*var notes = require('./notes.js')
console.log("server file is available")

 var age = notes.age

 console.log(age)
 var result=notes.addNumber(age,88)
 console.log(result)
var _ = require('lodash')
 var data=["person",'person',1,2,1,2,'name','age']
 var filter=_.uniq(data)
 console.log(filter)
 console.log(_.isString("Bhumika"))
 console.log(_.isString(data))
 */
 

// greet(2,3,callBack)
// setTimeout(delay =()=>{
//     console.log("hello")
// },4000)
// const jsonObject = {name:"Bhumika", age:20}
// const jsonString = JSON.stringify(jsonObject)
// console.log(jsonString)
// console.log(typeof jsonString)


const express = require('express')
const app = express()
 const db = require('./db');
 //const Person = require('./models/Person')
 //const menuItem = require('./models/MenuItem')
 const bodyParser = require('body-parser')
 app.use(bodyParser.json());//req.body
 const personRoutes = require('./routes/personRoutes')
 const menuItemRoutes =require('./routes/menuRoutes')
 require('dotenv').config();
 const PORT = process.env.PORT || 3000;
 const passport = require('./auth')


//Middleware function
const logMiddleware = ((req,res,next)=>{
    const date1 = new Date().toLocaleString();
    const url = req.originalUrl;
   // console.log(`[${new Date().toLocaleString()}] request made to this url: ${req.originalUrl}`)
    console.log("date :",date1 ,"request made to :",url);
    next();
})

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session:false})
app.use(logMiddleware);


app.get('/', localAuthMiddleware,function(req,res){
    res.send("hello welcome to my hotel..we have some menu")
}) 




app.use('/menuItem',localAuthMiddleware ,menuItemRoutes);
app.use('/person',personRoutes);

app.listen(PORT,()=>{
    console.log("listening on port 3000")
})
 
 
