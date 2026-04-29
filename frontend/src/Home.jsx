import { useState } from "react";

export default function Home() {
  const [budget, setBudget] = useState(0);
  const [result, setResult] = useState([]);

  const getTrips = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/trip/trips?budget=${budget}`);
      const data = await res.json();
      setResult(data.trips || []);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* --- Simple & Clean Navigation --- */}
      <nav className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center bg-white sticky top-0 z-50">
        <h1 className="text-2xl font-black tracking-tighter text-indigo-600">
          Tripma<span className="text-sky-400">.</span>
        </h1>
        
        <div className="hidden md:flex space-x-10 text-[13px] font-bold text-slate-400 uppercase tracking-[0.2em]">
          <a href="#" className="hover:text-indigo-600 transition">Flights</a>
          <a href="#" className="hover:text-indigo-600 transition">Hotels</a>
          <a href="#" className="hover:text-indigo-600 transition">Packages</a>
        </div>

        <div className="flex items-center space-x-6">
          <button className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition">Sign Up</button>
          <button className="bg-indigo-600 text-white text-sm font-bold py-3 px-8 rounded-full hover:bg-indigo-700 transition-all shadow-md active:scale-95">
            Login
          </button>
        </div>
      </nav>

      {/* --- Minimalist Hero Section --- */}
      <header className="max-w-5xl mx-auto pt-24 pb-32 px-8 text-center">
        <div className="inline-block bg-indigo-50 text-indigo-600 text-[11px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-8">
          Adventure awaits
        </div>
        <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1]">
          Where can your <br/> budget take you?
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-12 font-medium">
          Enter your budget below to discover curated travel experiences tailored for your unique journey.
        </p>

        {/* Clean Search Input */}
        <div className="flex flex-col md:flex-row items-center gap-4 max-w-xl mx-auto bg-slate-50 p-3 rounded-[32px] border border-slate-100 shadow-sm">
          <div className="flex-1 flex items-center px-6 w-full">
            <span className="text-slate-300 text-xl font-light mr-3">$</span>
            <input
              type="number"
              placeholder="What's your budget?"
              className="w-full bg-transparent py-4 text-lg font-bold focus:outline-none text-slate-700 placeholder:text-slate-300"
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>
          <button
            onClick={getTrips}
            className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-12 rounded-[24px] transition-all active:scale-95 shadow-lg shadow-indigo-100"
          >
            Find Trips
          </button>
        </div>
      </header>

      {/* --- Content Grid --- */}
      <main className="max-w-7xl mx-auto px-8 pb-32">
        <div className="flex items-end justify-between mb-12 border-b border-slate-50 pb-8">
          <div>
            <h3 className="text-3xl font-black tracking-tight">Suggested Destinations</h3>
            <p className="text-slate-400 font-medium mt-1">Based on your filter: ${budget}</p>
          </div>
          <span className="text-slate-300 font-bold text-sm tracking-widest uppercase">
            {result.length} Results
          </span>
        </div>

        {result.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {result.map((trip, index) => (
              <div 
                key={index} 
                className="group flex flex-col cursor-pointer"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[40px] mb-6">
                  <img 
                    src={trip.image || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800"} 
                    alt={trip.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-lg font-black text-indigo-600 shadow-sm">
                    ${trip.cost}
                  </div>
                </div>

                <div className="px-2">
                  <h4 className="text-2xl font-black text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors">
                    {trip.name}
                  </h4>
                  <div className="flex items-center text-slate-400 font-bold text-xs uppercase tracking-widest mt-2">
                    <span className="mr-2">📍</span> {trip.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-40 bg-slate-50/50 rounded-[60px] border-2 border-dashed border-slate-100">
            <div className="text-4xl mb-4">✨</div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">
              Ready for lift off? Enter a budget.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}