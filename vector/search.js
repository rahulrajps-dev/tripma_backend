import { LocalIndex } from "vectra";
import { getEmbedding } from "../utils/localEmbedding.js";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

function validateVector(vec) {
  return (
    Array.isArray(vec) &&
    vec.length > 0 &&
    vec.every((v) => typeof v === "number" && Number.isFinite(v))
  );
}

const index = new LocalIndex(path.join(process.cwd(), "vector_store"));

export async function searchPlaces(query, location, budget, interest) {
  try {
    const vector = await getEmbedding(query);

    if (!validateVector(vector)) {
      throw new Error("Invalid query embedding");
    }

    console.log("QUERY VECTOR LENGTH:", vector.length);

    const results = await index.queryItems(vector);

    const topResult = results.slice(0,5)

    const filtered = topResult
      .filter((result) => result?.item?.metadata)
      .map((result) => result.item.metadata);

    console.log("Interest", interest);

    console.log("RESULT COUNT:", topResult.length);
    console.log(
      "Filtered",
      filtered.map((p) => p.name),
    );

    return filtered;
  } catch (error) {
    console.log("❌ Search Error:", error.message); // ← clean
    throw error;
  }
}
