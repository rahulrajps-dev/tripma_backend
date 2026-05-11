import { useLocation, useNavigate } from "react-router-dom";

export default function Properties() {
  const location = useLocation();
  const navigate = useNavigate();

  const placeName = location.state?.placeName;

  const hotelData = {
    Goa: [
      {
        name: "Sea Side Resort",
        rating: 4.5,
        price: 2500,
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
      },

      {
        name: "Lotus Sutra Beachfront Resort",
        rating: 4.4,
        price: 2700,
        image:
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
      },

      {
        name: "Stone Wood Resort, Mandrem",
        rating: 3.9,
        price: 2000,
        image:
          "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1200&auto=format&fit=crop",
      },

      {
        name: "Taj Fort Aguada Resort & Spa",
        rating: 4.8,
        price: 8500,
        image:
          "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1200&auto=format&fit=crop",
      },

      {
        name: "Novotel Goa Resort & Spa",
        rating: 4.3,
        price: 5000,
        image:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
      },
    ],

    default: [
  {
    name: "Comfort Stay",
    rating: 4.2,
    price: 2000,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
  },

  {
    name: "City View Hotel",
    rating: 4.0,
    price: 1800,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
  },

  {
    name: "Royal Residency",
    rating: 4.4,
    price: 3200,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
  },

  {
    name: "Grand Palace Inn",
    rating: 4.6,
    price: 4500,
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1200&auto=format&fit=crop",
  },

  {
    name: "Sunset Bay Resort",
    rating: 4.3,
    price: 3800,
    image:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1200&auto=format&fit=crop",
  },

  {
    name: "Elite Comfort Suites",
    rating: 4.5,
    price: 5200,
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop",
  },
],
  };

  const hotels = hotelData[placeName] || hotelData["default"];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-between px-10 py-5">
        <div className="text-2xl font-black text-white tracking-tight">
          Trip<span className="text-sky-300">ma</span>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="bg-white/15 border border-white/25 text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-white/20 transition"
        >
          ← Back
        </button>
      </nav>

      {/* HERO */}
      <div className="bg-gradient-to-r from-sky-500 to-blue-600 px-10 pt-8 pb-16">
        <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-4">
          🏨 Premium Stays
        </div>

        <h1 className="text-4xl font-black text-white mb-3">
          Hotels in {placeName}
        </h1>

        <p className="text-white/80 text-sm max-w-2xl leading-relaxed">
          Discover the best stays, resorts, and hotels for your trip.
        </p>
      </div>

      {/* HOTEL LIST */}
      <div className="max-w-7xl mx-auto px-6 -mt-10 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">

          {hotels.map((hotel, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-2xl hover:-translate-y-1 transition duration-300"
            >
              {/* IMAGE */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-4 right-4 bg-white text-slate-900 text-sm font-extrabold px-3 py-1 rounded-full shadow-md">
                  ⭐ {hotel.rating}
                </div>

                <div className="absolute bottom-4 left-4 bg-black/60 text-white text-xs font-bold px-3 py-1 rounded-full">
                  📍 {placeName}
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <h2 className="text-xl font-black text-slate-900 leading-tight">
                      {hotel.name}
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                      Premium comfort stay
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-black text-sky-600">
                      ₹{hotel.price}
                    </div>

                    <div className="text-xs text-slate-400">
                      per night
                    </div>
                  </div>
                </div>

                {/* FEATURES */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {["Free WiFi", "Pool", "Breakfast"].map((item, idx) => (
                    <span
                      key={idx}
                      className="bg-sky-50 text-sky-700 text-xs font-bold px-3 py-1 rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* BUTTONS */}
                <div className="flex gap-3">
                  <button
                    onClick={() =>
                      navigate("/booking", {
                        state: { hotel, placeName },
                      })
                    }
                    className="flex-1 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold py-3 rounded-2xl hover:scale-[1.02] transition"
                  >
                    Book Now
                  </button>

                  <button className="px-4 bg-slate-100 rounded-2xl font-bold text-slate-700 hover:bg-slate-200 transition">
                    ♡
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}