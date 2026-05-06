// import Trip from "../models/Trip.js";
import axios from "axios";
import fs from "fs";
import { getEmbedding } from "../utils/localEmbedding.js";
import { getPlacesWithEmbeddings } from "../services/embeddingService.js";
import { searchPlaces } from "../vector/search.js";

const places = JSON.parse(fs.readFileSync("./places.json", "utf-8"));

function cosineSimilarity(a, b) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dot / (magA * magB);
}

export const getTrips = async (req, res) => {
  try {
    const placesWithEmbeddings = getPlacesWithEmbeddings();

    console.log("TYPE:", typeof placesWithEmbeddings);

    const { budget, location, days, interest } = req.query;
    console.log("Interest in controller", interest);

    //query changing to vector
    const queryText = `${location} ${budget} ${days}`;

    ///search from vectra

    const relevantPlaces = await searchPlaces(
      queryText,
      location,
      budget,
      interest,
    );

    console.log("Relevant places", relevantPlaces.length);
    console.log(
      "Relevant places names",
      relevantPlaces.map((p) => p.name),
    );

    //hard filter using interest and location

    const prompt = `
you are a travel planner.
User details are :
-User wants:${interest}
-Budget:INR${budget}
-My Location:${location}
-Number of days we have:${days}

Available Places.
${JSON.stringify(relevantPlaces)}

Instructions:
-Pick only places that match what user wants.
-Use only this available places
-Ignore places that are loosely related (if user wants beach, don't include waterfalls or temples)
-stays within budget
-generate daywise itenary for each destination

Return ONLY raw JSON. No markdown. No code fences. No explanation:
{
  "places": [
    {
      "name": "",
      "description": "",
      "estimatedCost": 0,
      "searchQuery": "",
      "itinerary": [
        { "day": 1, "place": "", "plan": "" }
      ],
      "cost": {
        "travel": 0,
        "stay": 0,
        "food": 0,
        "total": 0
      }
    },
    {
      "name": "",
      "description": "",
      "estimatedCost": 0,
      "searchQuery": "",
      "itinerary": [
        { "day": 1, "place": "", "plan": "" }
      ],
      "cost": {
        "travel": 0,
        "stay": 0,
        "food": 0,
        "total": 0
      }
    },
    {
      "name": "",
      "description": "",
      "estimatedCost": 0,
      "searchQuery": "",
      "itinerary": [
        { "day": 1, "place": "", "plan": "" }
      ],
      "cost": {
        "travel": 0,
        "stay": 0,
        "food": 0,
        "total": 0
      }
    }
  ]
}`;

    // console.log("placedata", placeData);

    ///api call

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent?key=${process.env.API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
    );

    const text = response.data.candidates[0].content.parts[0].text;
    const cleanedData = text.replace(/```json|```/g, "").trim();
    const aiPlan = JSON.parse(cleanedData);
    console.log(aiPlan);
    res.status(200).json({ aiPlan });
  } catch (error) {
    // console.log("❌ ERROR:", error.message);
    // console.log("📍 WHERE:", error.stack?.split("\n")[1]);
    // console.log("📟 STATUS:", error.response?.status);
    // console.log("📋 REASON:", error.response?.data?.error?.message);
    console.log("Error occured")
    res.status(500).json({ error: error.message });
  }
};
