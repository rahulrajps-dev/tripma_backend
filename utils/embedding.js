import axios from "axios";

export async function getEmbedding(text) {
  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-2:embedContent?key=${process.env.API_KEY}`,
    {
      model: "models/gemini-embedding-2",
      content: {
        parts: [{ text }],
      },
    },
  );
  const vector = response.data.embedding?.values;

  if (!vector) {
    throw new Error("Embedding not returned properly");
  }

  return vector;
}
