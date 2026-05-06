import { getEmbedding } from "./utils/embedding.js";
import dotenv from "dotenv";
dotenv.config();

console.log("API KEY VALUE:", process.env.API_KEY);

async function test() {
  try {
    const result = await getEmbedding("waterfall nature calm place");
    console.log("Embedding length:", result.length);
  } catch (err) {
    console.error("FULL ERROR:", err.response?.data || err.message);
  }
}
test();
