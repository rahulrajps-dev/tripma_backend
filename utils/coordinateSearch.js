import axios from "axios";


export async function searchCord(location) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    location,
  )}&format=json&limit=1`;

  const result = await axios.get(url, {
    headers: {
      "User-Agent": "travel-ai-project",
    },
  });

  const data = result.data[0];

  if (!data) {
    return null;
  }

  return {
    lat: Number(data.lat),
    lng: Number(data.lon),
  };
}
