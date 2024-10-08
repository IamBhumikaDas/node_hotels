 //
// (function(a,b){
//     console.log("bhumika is added")
// })();
//  function callBack(){
//      console.log("bhumika is calling a call back function")
//  }

//const { add } = require("lodash")

 
// add(3,88888,function(){
//     console.log("hello")
// })

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
//  const passport =require('./auth')
app.get('/',function(req,res){
    res.send("hello welcome to my hotel..we have some menu")
}) 




app.use('/menuItem',menuItemRoutes);
app.use('/person',personRoutes);

app.listen(PORT,()=>{
    console.log("listening on port 3000")
})
 
 
/*
 const PORT = process.env.PORT || 3000;
 //const person = require('./models/person')
 

app.use(passport.initialize())
 const MenuItem=require('./models/MenuItem')
 const personRoutes = require('./routes/personRoutes')
 localAuthMiddleware = passport.authenticate('local',{session:false})
 app.use('/person',personRoutes)
//middleware function
const logRequest = (req,res,next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next();//move on to the next phase 
     }
     
     app.use(logRequest)
app.get('/', function(req,res){
   res.send('hellow welcome....')
 })
// app.get('/chicken',(req,res)=>{
//     res.send("sure sir")
// })
// app.get('/idli',(req,res)=>{
//     var customized_idli={
//         name: "rava idli",
//         size:"10 cm",
//         is_sumber:"true",
//         is_chatni:'false'
//     }
   
//     res.send(customized_idli)
// })
 //app.post('/person',(req,res)=>{
 //    res.send("here is your data")
 //})
 

 app.post('./menu',async(req,res)=>{
    try{
const data=req.body
const newMenu=new MenuItem(data)
const response = await newMenu.save()
console.log("data saved")
res.status(200).json(response)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: 'internal server error'})

    }
 })
 
app.listen(PORT,()=>{
     console.log("server started")
 })
*/
