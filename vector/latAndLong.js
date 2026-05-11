import axios from "axios";
import fs from "fs";

const places = JSON.parse(fs.readFileSync("./places.json", "utf-8"));

let count=0 //debugging
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function enrich() {
  const enrichedData = [];
console.log("Places sample",places[0])
  for (const place of places) {
    try {
        count++
      

      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        place.location,
      )}&format=json&limit=1`;

      const response = await axios.get(url, {
        headers: {
          "User-Agent": "travel-ai-project",
        },
      });
      const data = response.data[0];

      if (!data) {
        console.log("No coordinates found for", place.location);
        enrichedData.push({
          ...place,
          lat: null,
          lng: null,
        });
        continue;
      }
      enrichedData.push({
        ...place,
        lat: Number(data.lat),
        lng: Number(data.lon),
      });
      console.log(
        `Added coordinates for ${place.name} → (${data.lat}, ${data.lon})`,
      );
      await delay(1000)
    } catch(error) {
      console.log(`Error processing ${place.name}`);

    enrichedData.push({
        ...place,
        lat: null,
        lng: null,
      });
    }
    fs.writeFileSync(
    "./places_enriched.json",
    JSON.stringify(enrichedData, null, 2)///creating new data with lat and lon
  );

  console.log("Enriched dataset saved!");
}
}

enrich();
  
  

