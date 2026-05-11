import { useLocation, useNavigate } from "react-router-dom";

export default function TripDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const trip = location.state?.place;

  if (!trip) return <h1>No trip data found</h1>;

  const TAG_COLORS = [
    "bg-blue-50 text-blue-600",
    "bg-green-50 text-green-600",
    "bg-amber-50 text-amber-600",
  ];

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
          className="bg-white/15 border border-white/25 text-white text-sm font-bold px-4 py-2 rounded-xl cursor-pointer hover:bg-white/20 transition"
        >
          ← Back to results
        </button>
      </nav>

      {/* HERO */}
      <div className="bg-gradient-to-r from-sky-500 to-blue-600 px-10 pt-8 pb-16">
        <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-4">
          ✈ AI Planned Trip
        </div>

        <h1 className="text-4xl font-black text-white mb-3">
          {trip.name}
        </h1>

        <p className="text-white/80 text-sm max-w-2xl leading-relaxed">
          {trip.description}
        </p>

        {/* SUMMARY PILLS */}
        <div className="flex flex-wrap gap-3 mt-6">
          <div className="bg-white/15 border border-white/20 text-white px-4 py-2 rounded-xl text-sm font-bold">
            ⭐ {trip.rating || 4.5}
          </div>

          <div className="bg-white/15 border border-white/20 text-white px-4 py-2 rounded-xl text-sm font-bold">
            💰 ₹{trip.estimatedCost?.toLocaleString()}
          </div>

          <div className="bg-white/15 border border-white/20 text-white px-4 py-2 rounded-xl text-sm font-bold">
            📍 {trip.location || trip.name}
          </div>

          <div className="bg-white/15 border border-white/20 text-white px-4 py-2 rounded-xl text-sm font-bold">
            🗓 {trip.itinerary?.length || 0} Days
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 -mt-10 pb-20">
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-lg">

          {/* MAIN IMAGE */}
          <div className="relative h-72 overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={
                trip.imageUrl ||
                `https://picsum.photos/seed/${encodeURIComponent(
                  trip.name
                )}/1200/600`
              }
              alt={trip.name}
            />

            <div className="absolute top-5 right-5 bg-white text-slate-900 text-sm font-extrabold px-4 py-2 rounded-full shadow-md">
              ₹{trip.estimatedCost?.toLocaleString()}
            </div>
          </div>

          {/* BODY */}
          <div className="p-6 md:p-8">

            {/* TAGS */}
            <div className="flex gap-2 flex-wrap mb-6">
              {[trip.name, trip.location, "AI Recommended"]
                .filter(Boolean)
                .slice(0, 3)
                .map((tag, ti) => (
                  <span
                    key={ti}
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      TAG_COLORS[ti % TAG_COLORS.length]
                    }`}
                  >
                    {tag}
                  </span>
                ))}
            </div>

            {/* GALLERY */}
            <div className="mb-10">
              <h2 className="text-xl font-black text-slate-900 mb-4">
                📸 Destination Gallery
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((img) => (
                  <img
                    key={img}
                    src={`https://picsum.photos/seed/${trip.name + img}/500/400`}
                    alt="gallery"
                    className="h-36 w-full object-cover rounded-2xl hover:scale-105 transition duration-300"
                  />
                ))}
              </div>
            </div>

            {/* ATTRACTIONS */}
            {trip.attractions && (
              <div className="mb-10">
                <h2 className="text-xl font-black text-slate-900 mb-4">
                  🎯 Top Attractions
                </h2>

                <div className="flex flex-wrap gap-3">
                  {trip.attractions.map((a, i) => (
                    <span
                      key={i}
                      className="bg-sky-50 text-sky-700 text-sm font-bold px-4 py-2 rounded-full"
                    >
                      {a.name || a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* ITINERARY */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-black text-slate-900">
                  📅 Day-wise Itinerary
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {trip.itinerary?.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="bg-slate-50 border border-slate-200 rounded-3xl p-5 hover:shadow-lg transition"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-sky-100 text-sky-700 text-xs font-extrabold px-3 py-1 rounded-full">
                        Day {item.day}
                      </span>

                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                        Travel Plan
                      </span>
                    </div>

                    <h3 className="text-lg font-extrabold text-slate-900 mb-2">
                      {item.place}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.plan}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* COST BREAKDOWN */}
            <div className="mb-10">
              <h2 className="text-2xl font-black text-slate-900 mb-5">
                💸 Cost Breakdown
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    label: "Travel",
                    value: trip.cost?.travel,
                  },
                  {
                    label: "Stay",
                    value: trip.cost?.stay,
                  },
                  {
                    label: "Food",
                    value: trip.cost?.food,
                  },
                  {
                    label: "Total",
                    value: trip.cost?.total,
                    dark: true,
                  },
                ].map(({ label, value, dark }) => (
                  <div
                    key={label}
                    className={`rounded-2xl p-5 text-center ${
                      dark
                        ? "bg-gradient-to-br from-sky-500 to-blue-600"
                        : "bg-slate-50 border border-slate-200"
                    }`}
                  >
                    <div
                      className={`text-xs font-bold uppercase tracking-widest ${
                        dark ? "text-white/70" : "text-slate-400"
                      }`}
                    >
                      {label}
                    </div>

                    <div
                      className={`text-2xl font-black mt-2 ${
                        dark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      ₹{value?.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TRAVEL TIPS */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 mb-8">
              <h2 className="text-xl font-black text-slate-900 mb-4">
                🧳 Travel Tips
              </h2>

              <ul className="space-y-3 text-sm text-slate-600">
                <li>• Start your day early for better sightseeing.</li>
                <li>• Keep some extra cash for local transport.</li>
                <li>• Carry sunscreen and comfortable clothing.</li>
                <li>• Check weather before planning outdoor activities.</li>
              </ul>
            </div>

            {/* CTA */}
            <button
              onClick={() =>
                navigate("/Properties", {
                  state: { placeName: trip.name },
                })
              }
              className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm font-bold py-4 rounded-2xl hover:scale-[1.01] transition-transform shadow-lg"
            >
              Show properties in {trip.name} →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}