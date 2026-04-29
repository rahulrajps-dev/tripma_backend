import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  name: String,
  location: String,
  cost: Number,
  type: String,
  image:String,
});

export default mongoose.model("Trip", tripSchema);
