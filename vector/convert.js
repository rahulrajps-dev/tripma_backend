import xlsx from "xlsx";
import fs from "fs";

//read excel

const excel = xlsx.readFile("./data/Places.csv");
const sheet = excel.Sheets[excel.SheetNames[0]];
const rows = xlsx.utils.sheet_to_json(sheet);

console.log("rows length", rows.length);
console.log("sample", rows[0]);

// const targetCities = [

//   "Munnar", "Varkala", "Alleppey", "Wayanad", 
//   "Kochi", "Kovalam", "Thrissur",
//   "Goa",  "Mumbai", "Delhi",
//   "Agra", "Varanasi", "Bangalore", 
//   "Ooty", "Shimla", "Manali"
// ];

//to add desc

const guessType = (desc) => {
  const d = desc.toLowerCase();
  if(d.includes("beach")) return "beach"
  if(d.includes("temple"))return "temple"
  if(d.includes("waterfall")) return "nature"
  if(d.includes("museum")) return "museum"
  if(d.includes("fort")||d.includes("palace")) return "history"
  return "general"
};

//convert to our format

const places = rows.map((r) => ({
  name: r.Place || " ",
  location: r.City || " ",
  type: guessType(r.Place_desc),
  cost: 0,
  time_required: r.Distance || " ",
  desc: r.Place_desc || " ",
  ratings: Number(r.ratings) || 0,
}));
//creating file in clean format
fs.writeFileSync("./places.json", JSON.stringify(places, null, 2));

console.log("File created", places.length, "Places created in JSON");
