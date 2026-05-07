import { pipeline } from "@xenova/transformers";

let embedder = null;
let loadingPromise = null; 


//lazing loading only loaded once when needed
async function getLocalEmbedder() {
 
  if (embedder) return embedder;

  
  if (!loadingPromise) {
    console.log(" Loading embedding model...");
    loadingPromise = pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    ).then((model) => {
      embedder = model;
      console.log(" Model loaded");
      return model;
    }).catch((err) => {
      console.log(" Model load failed:", err.message);
      loadingPromise = null; 
      throw err;
    });
  }

  return loadingPromise;
}

export async function getEmbedding(text) {
  try {
    if (!text || typeof text !== "string") {
      console.log(" Invalid text:", text);
      return null;
    }

    const model = await getLocalEmbedder();

    const output = await model(text, {
      pooling: "mean",
      normalize: true,
    });

    if (!output || !output.data) {
      console.log(" Invalid output for:", text);
      return null;
    }

    const embedding = Array.from(output.data);

    if (embedding.length !== 384) {
      console.log(" Unexpected embedding length:", embedding.length);
    }

    return embedding;

  } catch (error) {
    console.log(" Embedding Error:", error.message);
    return null; 
  }
}