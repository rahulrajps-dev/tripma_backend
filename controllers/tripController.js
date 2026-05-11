// import Trip from "../models/Trip.js";
import axios from "axios";
import fs from "fs";
import { getEmbedding } from "../utils/localEmbedding.js";
import { getPlacesWithEmbeddings } from "../services/embeddingService.js";
import { searchPlaces } from "../vector/search.js";

// const places = JSON.parse(fs.readFileSync("./places.json", "utf-8"));

export const getTrips = async (req, res) => {
  try {
    // const placesWithEmbeddings = getPlacesWithEmbeddings();

    // console.log("TYPE:", typeof placesWithEmbeddings);

    const { budget, location, days, interest } = req.query;
    console.log("Interest in controller", interest);

    //query changing to vector
    const queryText = `User from ${location}.Intrested in ${interest}.Trips for ${days}`;

    ///search from vectra

    const relevantPlaces = await searchPlaces(
      queryText,
      location,
      budget,
      interest, /// we are hard filtering with location and interest so we need them seperately
      days
    );

    console.log("Relevant places", relevantPlaces.length);
    console.log(
      "Relevant places names",
      relevantPlaces.map((p) => p.name),
    );
    console.log("relevant place full",relevantPlaces)

    //hard filter using interest and location

    const prompt = `You are a travel itinerary generator.

User details:
- Interest: ${interest}
- Starting Location: ${location}
- Number of Days: ${days}

The following places are ALREADY ranked based on:
- semantic relevance
- travel feasibility
- distance
- ratings

Use the places exactly in the given order.
Do NOT reorder, replace, or invent destinations.


Available Ranked Places:
${JSON.stringify(relevantPlaces)}

Instructions:
- Generate travel recommendations only from the provided places.
- Preserve the ranking order exactly as given.
- Include the place rating in the response.
- Create short and realistic descriptions.
- Generate practical day-wise itineraries.
- Keep plans aligned with the user's budget and trip duration.
- Use attraction names from the provided data whenever possible.
- Return up to 10 destinations if available.
- Do not include unrelated place types.
-Each destination is an ALTERNATIVE trip option.
-Do NOT combine multiple destinations into one itinerary.
-Generate a SEPARATE itinerary for each destination independently.

Return ONLY raw JSON.
No markdown.
No explanation.
No code fences.

{
  "places": [
    {
      "name": "",
      "location": "",
      "rating": 0,
      "description": "",
      "estimatedCost": 0,
      "searchQuery": "",
      "itinerary": [
        {
          "day": 1,
          "place": "",
          "plan": ""
        }
      ],
      "cost": {
        "travel": 0,
        "stay": 0,
        "food": 0,
        "total": 0
      }
    }
  ]
}
`;

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
    console.log("Places:",aiPlan);
    res.status(200).json({ aiPlan });
  } catch (error) {
    
    console.log("Error occured")
    res.status(500).json({ error: error.message });
  }
};
