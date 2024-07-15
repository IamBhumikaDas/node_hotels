// function add(a,b){
//    return  a+b
// }
// console.log(add(2,6))
// (function(a,b){
//     console.log("bhumika is added")
// })();
// function callBack(){
//     console.log("bhumika is calling a call back function")
// }
// const add=function(a,b,callback){
//     var result=a+b;
//     console.log("result: " ,result)
//     callback()
// }
// add(3,88888,function(){
//     console.log("hello")
// })
// var fs = require('fs')
// var os = require('os')
// var user =os.userInfo()
// console.log(user.username)
// fs.appendFile('greeting.txt','hi'+user.username+'!\n',()=>{console.log("file is created")})
// console.log(os)
// var notes = require('./notes.js')
// console.log("server file is available")

// var age = notes.age
// console.log(age)
// var result=notes.addNumber(45,88)
// console.log(result)
// var _ = require('lodash')
// var data=["person",'person',1,2,1,2,'name','age']
// var filter=_.uniq(data)
// console.log(filter)
// console.log(_.isString(data))

const express = require('express')
const app = express()
const db = require('./db');
const bodyParser = require('body-parser')
 app.use(bodyParser.json());//req.body
 require('dotenv').config();
 const PORT = process.env.PORT || 3000;

 const MenuItem=require('./models/MenuItem')
 const personRoutes = require('./routes/personRoutes')
 app.use('/person',personRoutes)

app.get('/',function(req,res){
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

