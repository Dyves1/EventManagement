import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";


import allRoutes from "./Routes/allRoutes.js"

mongoose.set('strictQuery', false)

// configuring dotenv
dotenv.config();

// create server instance
const app = express();

// use of cors and body parse
app.use(cors({origin:'*'}))
app.use(bodyParser.json({limit:"50mb",type:"application/json"}))
app.use(bodyParser.urlencoded({extended:true}))

// route - home route
app.get("/", (req, res)=> {
  res.status(200).send(`
  Welcome to our api home page
  `)
})

app.use("/", allRoutes)

// define some variables
const port = process.env.PORT;
const host = process.env.HOST;
const dataBase=process.env.MONGODB_URL

// database some variables
const con =()=> mongoose.connect(dataBase,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    
  });

// instance to listen to our server
const startServer = ()=>app.listen(port);

Promise.all([con(), startServer()])
 .then(()=>{
  console.log(`MongoDB connected and server listening at http://${host}:${port}`);
 })
 .catch((err) =>console.log(err))

