import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import tripRoutes from "./routes/tripRoutes.js"
import Trip from "./models/Trip.js";

import authRoutes from "./routes/authRoutes.js"
dotenv.config()

const app=express();

app.use(cors());
app.use(express.json());
app.use("/api/trip",tripRoutes)
app.use("/api/auth",authRoutes)


app.get('/',(req,res)=>{
    res.send("Api is running");
})

mongoose.connect(process.env.MONGO_URI)
  .then(async() => {
    console.log("MongoDB Connected");
  // await Trip.create({
  //     name: "Munnar",
  //     location: "Kerala",
  //     cost: 3000,
  //     type: "hill station"
  //   });
  //   console.log("Data inserted");
  })
  .catch(err => {
    console.log("DB ERROR:");
    console.log(err);
  });

const PORT=5000;
app.listen(PORT,()=>console.log('server running '))
