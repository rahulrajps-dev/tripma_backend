import { pipeline } from "@xenova/transformers";

let embedder;

export async function getLocalEmbedder(text) {
  if (!embedder) {
    embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  }
  return embedder;
}
export async function getEmbedding(text) {
    try{
  const model = await getLocalEmbedder();
  const output = await model(text, {
    pooling: 'mean',
    normalize: true,
  });
  
  // Add these logs
  console.log("Output type:", typeof output);
  console.log("Output keys:", Object.keys(output));
  console.log("Output data type:", typeof output.data);
  console.log("Output data length:", output.data?.length);
  console.log("First 5 values:", Array.from(output.data).slice(0, 5));
  
  return Array.from(output.data);
}catch(error){
     console.log("❌ Embedding Error:", error.message); 
    throw error;
}
}