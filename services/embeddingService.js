import fs from "fs";
import { getEmbedding } from "../utils/localEmbedding.js";

const places = JSON.parse(fs.readFileSync("./places.json", "utf-8"));

let embeddData = [];

export const loadPlaceEmbeddings = async () => {
  embeddData = await Promise.all(
    places.map(async (place) => {
      const text = `${place.name} ${place.location} ${place.cost}`;

      const embedding = await getEmbedding(text);

      return {
        ...place,
        embedding,
      };
    }),
  );
};

//encapsulation loading once and using data in another function
//getter

export const getPlacesWithEmbeddings = () => embeddData;