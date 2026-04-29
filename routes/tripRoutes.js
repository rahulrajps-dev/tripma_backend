import express from  "express";
import { getTrips } from "../controllers/tripController.js"

const router = express.Router();


router.get("/trips", (req, res, next) => {
  console.log("ROUTE HIT /trips");
  next();
}, getTrips);

export default router;


