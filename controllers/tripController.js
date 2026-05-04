// import Trip from "../models/Trip.js";
import axios from "axios";
export const getTrips = async (req, res) => {
  try {
    const { budget,location,days } = req.query;
    // let query = {};

    // if (budget) {
    //   query.cost = { $lte: Number(budget) };
    // }

    // const trips = await Trip.find(query);
    // console.log("Query", query);
    // console.log("ALL DATA:", trips);
  

    //Creating place data to send as a prompt
    // const placeData = trips.map((p) => {
    //   return `Place:${p.name},Cost:${p.cost},location:${p.location}`;
    // });

    //creating prompt

    const prompt = `
you are a travel planner.
User details are :
-Budget:INR${budget}
-My Location:${location}
-Number of days we have:${days}

Instructions:
-Choose the places i can go from my location which stays with in the budget give me muliple options if i have from ${location}
-generate daywise itenary for each destination
-provide a cost breakdown for each destination

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
    console.log("prompt", prompt);

    ///api call

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
    );
    const text = response.data.candidates[0].content.parts[0].text;
    const cleanedData = text.replace(/```json|```/g,"").trim()
    const aiPlan=JSON.parse(cleanedData)
    console.log(aiPlan)
    res.status(200).json({ aiPlan });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
