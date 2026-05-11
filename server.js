import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import tripRoutes from "./routes/tripRoutes.js"
import Trip from "./models/Trip.js";
import authRoutes from "./routes/authRoutes.js"
import { loadPlaceEmbeddings } from "./services/embeddingService.js";


dotenv.config()

const app=express();

process.on('uncaughtException', (error) => {
  console.log("❌ Uncaught:", error.message);
  console.log("📍 Where:", error.stack?.split('\n')[1]);
});

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);

  
await loadPlaceEmbeddings();

  console.log("Embeddings loaded");
});
