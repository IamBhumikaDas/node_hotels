const mongoose= require("mongoose");
require('dotenv').config();
//define the mongodb connection url
//const mongoUrl = 'mongodb://localhost:27017/hotels'//replace mydatabasewith hotels
const mongoUrl = process.env.MONGODB_URL;

//set up mongodb connection
mongoose.connect(mongoUrl,
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
    console.log('mongodb connection error',err)
})
db.on('disconnected',()=>{
    console.log("mongodb disconnected")
})
//export the database connection
module.exports= db;