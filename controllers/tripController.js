import Trip from "../models/Trip.js";
export const getTrips = async(req, res) => {
  try{const { budget } = req.query;

  let query = {};

  if(budget){
    query.cost={ $lte:Number(budget) };
  }

  const trips = await Trip.find(query)
  console.log("Query",query)
  console.log("ALL DATA:", trips);
  res.status(200).json({ trips })
}catch(error){
  res.status(500).json({error:error.message})
}
};

