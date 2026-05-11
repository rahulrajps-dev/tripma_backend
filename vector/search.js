import { LocalIndex } from "vectra";
import { getEmbedding } from "../utils/localEmbedding.js";
import path from "path";
import dotenv from "dotenv";
import { searchCord } from "../utils/coordinateSearch.js";
import { haversine } from "../utils/distance.js";

dotenv.config();

function validateVector(vec) {
  return (
    Array.isArray(vec) &&
    vec.length > 0 &&
    vec.every((v) => typeof v === "number" && Number.isFinite(v))
  );
}

const index = new LocalIndex(path.join(process.cwd(), "vector_store"));

export async function searchPlaces(query, location, budget, interest, days) {
  try {
    const vector = await getEmbedding(query);

    if (!validateVector(vector)) {
      throw new Error("Invalid query embedding");
    }

    console.log("QUERY VECTOR LENGTH:", vector.length);

    const results = await index.queryItems(vector);

    console.log("TOP RESULT", results[0]);

    const userCoords = await searchCord(location); ///user location coordinate

    

    const filtered = results
      .filter((result) => result?.item?.metadata)
      .map((result) => {
        const place = result.item.metadata;

        const distance = haversine(
          userCoords.lat,
          userCoords.lng,
          place.lat,
          place.lng,
        ); ///sending data to calculate distance
        return {
          ...place,
          semanticScore: result.score,
          distance,
        };
      });

    //max distance
    console.log("days",days)
    console.log("days type",typeof(days))
      const tripDays=Number(days)

    function maxDistance(tripDays) {
      if (tripDays <= 2) return 300;
      if (tripDays <= 5) return 800;

      return 2000;
    }

    console.log("filtered", filtered[0]);
    const feasiblePlaces = filtered.filter(
      (place) => place.distance <= maxDistance(tripDays),
    ); //hard filter remove places that are not pratical to travel

    console.log("Feasible places", feasiblePlaces[0]);

    console.log("feasible count COUNT:", feasiblePlaces.length);

    console.log("user coord", userCoords);
   

    //penalty logic

    const rankedPlaces = feasiblePlaces.map((place) => {
      const distancePenalty = place.distance / (tripDays * 500); // if distance is high and days are low give huge penalty

      const ratingBoost = place.ratings / 10;
    
      return {
        ...place,
        finalScore: place.semanticScore + ratingBoost - distancePenalty,
      };
    });
    console.log("ranked Place sample", rankedPlaces[2]);
    console.log("rankedPlace lebgth", rankedPlaces.length);
    rankedPlaces.sort((a, b) => b.finalScore - a.finalScore);
    const grouped = {};

rankedPlaces.forEach((place) => {

  // if location not already created
  if (!grouped[place.location]) {

    grouped[place.location] = {
      location: place.location,
      attractions: [],
      avgRating: place.ratings || 0,
      score: place.finalScore,
    };
  }

  grouped[place.location].attractions.push({
    name: place.name,
    type: place.type,
    rating: place.ratings,
  });
});
const groupedPlaces = Object.values(grouped);
    // console.log(
    //   "Filtered",
    //   filtered.map((p) => p.name),
    // );

    return groupedPlaces.slice(0, 10);
  } catch (error) {
    console.log("❌ Search Error:", error.message); // ← clean
    throw error;
  }
}
