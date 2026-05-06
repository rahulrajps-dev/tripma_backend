import { LocalIndex } from "vectra";
import fs from "fs";
import { getEmbedding } from "../utils/localEmbedding.js";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const places = JSON.parse(fs.readFileSync("./places.json", "utf-8"));

// validate vector properly
function validateVector(vec) {
  return (
    Array.isArray(vec) &&
    vec.length > 0 &&
    vec.every(v => typeof v === "number" && Number.isFinite(v))
  );
}

async function seed() {
  const index = new LocalIndex(
    path.join(process.cwd(), "vector_store")
  );

  // create index only if needed
  if (!(await index.isIndexCreated())) {
    await index.createIndex();
    console.log("Index created");
  }

  for (const place of places) {
    // basic validation
    if (!place?.name || !place?.location) {
      console.log("Skipping invalid place:", place);
      continue;
    }

    const text = `${place.name} ${place.cost} ${place.location}`;
    const embedding = await getEmbedding(text);

    // embedding validation
    if (!validateVector(embedding)) {
      console.log("Bad embedding skipped:", place.name);
      continue;
    }

    await index.insertItem({
      vector: embedding,
      metadata: {
        name: place.name,
        cost: place.cost,
        location: place.location,
        type: place.type || "unknown",
      },
    });

    console.log("Added:", place.name);
  }

  console.log("All places added to vectra");
}

seed();