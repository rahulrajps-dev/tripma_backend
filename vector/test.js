import { getEmbedding } from "../utils/localEmbedding.js";

const run = async () => {
  const emb = await getEmbedding("beach in goa");
  console.log("Length:", emb.length);
};

run();