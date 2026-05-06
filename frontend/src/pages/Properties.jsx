import { useLocation, useNavigate } from "react-router-dom";

export default function Properties() {
  const location = useLocation();
  const navigate = useNavigate();

  const placeName = location.state?.placeName;

  const hotelData = {
  Goa: [
    { name: "Sea Side Resort", rating: 4.5, price: 2500 },
    { name: "Lotus Sutra Beachfront Resort", rating: 4.4, price: 2700 },
    { name: "Stone Wood Resort, Mandrem", rating: 3.9, price: 2000 },
    { name: "Taj Fort Aguada Resort & Spa", rating: 4.8, price: 8500 },
    { name: "Novotel Goa Resort & Spa", rating: 4.3, price: 5000 },
  ],

  Munnar: [
    { name: "Tea Valley Resort", rating: 4.3, price: 1800 },
    { name: "Parakkat Nature Resort", rating: 4.6, price: 4000 },
    { name: "Blanket Hotel & Spa", rating: 4.5, price: 4200 },
    { name: "Elixir Hills Suites Resort", rating: 4.4, price: 3500 },
    { name: "The Panoramic Getaway", rating: 4.8, price: 6500 },
  ],

  Ooty: [
    { name: "Sterling Ooty Elk Hill", rating: 4.3, price: 4000 },
    { name: "Savoy IHCL Ooty", rating: 4.6, price: 7000 },
    { name: "Fortune Resort Sullivan Court", rating: 4.5, price: 5200 },
    { name: "Gem Park Ooty", rating: 4.2, price: 4500 },
    { name: "Club Mahindra Derby Green", rating: 4.4, price: 6000 },
  ],

  default: [
    { name: "Comfort Stay", rating: 4.2, price: 2000 },
    { name: "City View Hotel", rating: 4.0, price: 1800 },
    { name: "Budget Inn", rating: 3.8, price: 1200 },
    { name: "Luxury Suites", rating: 4.6, price: 5000 },
    { name: "Royal Residency", rating: 4.3, price: 3000 },
  ],
};

  const hotels = hotelData[placeName] || hotelData["default"];

  console.log("placeName:", placeName);

  return (
    <div className="p-10">
      
      {/* ✅ FIXED */}
      <h1 className="text-2xl font-bold mb-4">
        Hotels in {placeName}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {hotels.map((hotel, i) => (
          <div key={i} className="border p-4 rounded-xl bg-white">
            <h3 className="font-bold">{hotel.name}</h3>
            <p>⭐ {hotel.rating}</p>
            <p>₹{hotel.price}</p>

            <button
              onClick={() =>
                navigate("/booking", {
                  state: { hotel, placeName },
                })
              }
              className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}