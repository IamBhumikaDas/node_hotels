const mongoose= require("mongoose");
require ('dotenv').config();
//define the mongodb connection url
//const mongoURL = process.env.MONGODB_URL_LOCAL 
const mongoURL= process.env.MONGODB_URL
//changing url


//set up mongodb connection
mongoose.connect(mongoURL,
    {useNewUrlParser:true,
    useUnifiedTopology:true}
)
//get the default connection
//
const db = mongoose.connection;
//define event listeners for database connection

db.on('connected',()=>{
    console.log("connected mongodb server")
})
db.on('error',(err)=>{
    console.error('mongodb connection error',err)
})
db.on('disconnected',()=>{
    console.log("mongodb disconnected")
})
//export the database connection
module.exports= db;
