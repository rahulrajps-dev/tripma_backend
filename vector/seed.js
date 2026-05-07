import { LocalIndex } from "vectra";
import fs from "fs";
import { getEmbedding } from "../utils/localEmbedding.js";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const places = JSON.parse(fs.readFileSync("./places.json", "utf-8"));

function validateVector(vec) {
  return (
    Array.isArray(vec) &&
    vec.length === 384 &&
    vec.every((v) => typeof v === "number" && Number.isFinite(v))
  );
}

// small delay to prevent memory crash
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function seed() {
  const index = new LocalIndex(path.join(process.cwd(), "vector_store"));

  if (!(await index.isIndexCreated())) {
    await index.createIndex();
    console.log("✅ Index created");
  }

  let success = 0;
  let skipped = 0;

  for (let i = 0; i < places.length; i++) {
    const place = places[i];

    if (!place?.name || !place?.location) {
      skipped++;
      continue;
    }

    const text = `${place.name} located in ${place.location} ${place.desc} This description is known for ${place.type || ""}`;

    const embedding = await getEmbedding(text);

    if (!validateVector(embedding)) {
      console.log("❌ Skipped:", place.name);
      skipped++;
      continue;
    }

    await index.insertItem({
      vector: embedding,
      metadata: {
        name: place.name,
        cost: place.cost || 0,
        location: place.location,
        type: place.type || "unknown",
      },
    });

    success++;

    if (i % 100 === 0) {
      console.log(`Progress: ${i}/${places.length}`); ///print progress in every 100 iterations
    }
    await delay(50); //delay
  }

  console.log("🎉 Done seeding");
  console.log("✅ Success:", success);
  console.log("❌ Skipped:", skipped);
}

seed();
