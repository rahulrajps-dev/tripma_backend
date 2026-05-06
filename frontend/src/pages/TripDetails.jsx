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
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>

      {/* NAV */}
      <nav className="bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-between px-10 py-5">
        <div className="text-2xl font-black text-white tracking-tight">
          Trip<span className="text-sky-300">ma</span>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="bg-white/15 border border-white/25 text-white text-sm font-bold px-4 py-2 rounded-xl cursor-pointer"
        >
          ← Back to results
        </button>
      </nav>

      {/* HERO */}
      <div className="bg-gradient-to-r from-sky-500 to-blue-600 px-10 pt-8 pb-14">
        <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-3">
          ✈ Trip Details
        </div>
        <h1 className="text-3xl font-black text-white mb-1">Your AI-Planned Trip</h1>
        <p className="text-white/75 text-sm font-medium">
           destination
        </p>
      </div>

      {/* CARDS */}
      <div className="max-w-4xl mx-auto px-6 -mt-6 pb-20">
        
          <div
            
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-5"
          >
            {/* Image */}
            <div className="relative h-52 overflow-hidden bg-slate-200">
              <img
                className="w-full h-full object-cover"
                src={trip.imageUrl || `https://picsum.photos/seed/${encodeURIComponent(trip.name)}/800/400`}
                alt={trip.name}
              />
              <div className="absolute top-3 right-3 bg-white text-slate-900 text-sm font-extrabold px-3 py-1 rounded-full shadow-md">
                ₹{trip.estimatedCost?.toLocaleString()}
              </div>
              <div className="absolute bottom-3 left-3 bg-black/55 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                ⭐ 4.8
              </div>
            </div>

            <div className="p-5">
              {/* Name */}
              <h3 className="text-lg font-extrabold text-slate-900 mb-2">{trip.name}</h3>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap mb-3">
                {[trip.name].slice(0, 3).map((tag, ti) => (
                  <span key={ti} className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${TAG_COLORS[ti % TAG_COLORS.length]}`}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-xs text-slate-500 leading-relaxed mb-4">{trip.description}</p>

              <div className="h-px bg-slate-100 my-3" />

              {/* Itinerary */}
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
                📅 Day-wise Itinerary
              </p>
              <div className="flex flex-col gap-2">
                {trip.itinerary?.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex gap-2 items-start">
                    <span className="text-[10px] font-extrabold bg-slate-100 text-slate-500 px-2 py-0.5 rounded shrink-0 mt-0.5">
                      Day {item.day}
                    </span>
                    <span className="text-xs text-slate-700 leading-relaxed">{item.plan}</span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-slate-100 my-3" />

              {/* Cost */}
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
                💸 Cost Breakdown
              </p>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: "Travel", value: trip.cost?.travel },
                  { label: "Stay",   value: trip.cost?.stay },
                  { label: "Food",   value: trip.cost?.food },
                  { label: "Total",  value: trip.cost?.total, dark: true },
                ].map(({ label, value, dark }) => (
                  <div key={label} className={`rounded-xl p-2 text-center ${dark ? "bg-gradient-to-br from-sky-500 to-blue-600" : "bg-slate-50"}`}>
                    <div className={`text-[9px] font-bold uppercase tracking-wide ${dark ? "text-white/70" : "text-slate-400"}`}>{label}</div>
                    <div className={`text-xs font-extrabold mt-0.5 ${dark ? "text-white" : "text-slate-900"}`}>₹{value?.toLocaleString()}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
  <button
    onClick={() => navigate("/Properties", { state:{ placeName: trip.name }})}
    className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm font-bold py-2.5 rounded-xl hover:scale-[1.02] transition-transform"
  >
    Show properties in {trip.name}→
  </button>
</div>
            </div>
          </div>
        
      </div>

    </div>
  );
}