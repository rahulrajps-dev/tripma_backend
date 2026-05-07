import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiPaperPlane } from "react-icons/bi";
import { BiSolidPlaneTakeOff } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import { BsCalendarWeek } from "react-icons/bs";
import { IoSearchSharp } from "react-icons/io5";
import { TbBulb } from "react-icons/tb";


export default function Home() {
  const [budget, setBudget] = useState("");
  const [fromLoc, setFrom] = useState("");
  const [numDays, setNumDays] = useState("");
  const [aiData, setAiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [interest, setInterest] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const key = import.meta.env.VITE_PEXELS_KEY;

  const getImages = async (placeName) => {
    try {
      const cleanName = placeName.split(",")[0].trim();
      const res = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(cleanName + " travel")}&per_page=1`,
        { headers: { Authorization: key } },
      );
      const data = await res.json();
      return data.photos?.[0]?.src?.large || null;
    } catch {
      return null;
    }
  };

  const getTrips = async () => {
    setLoading(true);
    setAiData(null);
    setError(null);
    try {
      const res = await fetch(
        `http://localhost:5000/api/trip/trips?budget=${budget}&location=${fromLoc}&days=${numDays}&interest=${interest}`,
      );
      const data = await res.json();

      if (!res.ok) {
        if (res.status == 503) {
          setError("Sorry AI is busy right now,Please try again in a moment");
        } else {
          setError("Something went wrong,Please try again");
        }
        return;
      }

      const aiPlan = data.aiPlan || null;
      if (aiPlan?.places) {
        const placesWithImages = await Promise.all(
          aiPlan.places.map(async (place) => {
            const imageUrl = await getImages(place.name);
            return { ...place, imageUrl };
          }),
        );
        setAiData({ ...aiPlan, places: placesWithImages });
      } else {
        setAiData(aiPlan);
      }
    } catch (err) {
      setError("Gemini is busy,please try again in a moment");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const TAG_COLORS = [
    "bg-blue-50 text-blue-600",
    "bg-green-50 text-green-600",
    "bg-amber-50 text-amber-600",
    "bg-rose-50 text-rose-500",
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; }

        @keyframes fadeDown { from { opacity:0; transform:translateY(-16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeUp   { from { opacity:0; transform:translateY(18px);  } to { opacity:1; transform:translateY(0); } }
        @keyframes cardIn   { from { opacity:0; transform:translateY(24px);  } to { opacity:1; transform:translateY(0); } }
        @keyframes zoomIn   { from { transform:scale(1.08); }                  to { transform:scale(1); } }
        @keyframes bounce   { 0%,100% { transform:translateY(0); } 50% { transform:translateY(6px); } }
        @keyframes spin     { to { transform:rotate(360deg); } }
        @keyframes shimmer  { to { background-position:-200% 0; } }

        .anim-fade-down  { animation: fadeDown 0.6s ease both; }
        .anim-fade-up-1  { animation: fadeUp 0.6s 0.20s ease both; opacity:0; }
        .anim-fade-up-2  { animation: fadeUp 0.6s 0.35s ease both; opacity:0; }
        .anim-fade-up-3  { animation: fadeUp 0.6s 0.50s ease both; opacity:0; }
        .anim-fade-up-4  { animation: fadeUp 0.6s 0.65s ease both; opacity:0; }
        .anim-fade-up-5  { animation: fadeUp 0.6s 0.90s ease both; opacity:0; }
        .anim-zoom       { animation: zoomIn 8s ease both; }
        .anim-bounce     { animation: bounce 1.5s infinite; }
        .anim-spin       { animation: spin 0.7s linear infinite; }
        .anim-card       { animation: cardIn 0.45s ease both; }

        .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(0,0,0,0.12); }
        .card-hover:hover .card-img-zoom { transform: scale(1.07); }
        .card-img-zoom { transition: transform 0.5s ease; }

        .go-btn-hover { transition: transform 0.2s, box-shadow 0.2s; }
        .go-btn-hover:hover:not(:disabled) { transform: scale(1.04); box-shadow: 0 8px 24px rgba(14,165,233,0.4); }
        .go-btn-hover:active:not(:disabled) { transform: scale(0.97); }

        .skel {
          background: linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
          border-radius: 8px;
        }

        input:focus { outline: none; }
      `}</style>

      {/* ── NAV ── */}
      <nav className="anim-fade-down absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-10 py-5">
        <div className="text-2xl font-black text-white tracking-tight">
          Trip<span className="text-sky-400">ma</span>
        </div>

        <div className="hidden md:flex gap-8">
          {["Explore", "Hotels", "Flights"].map((l) => (
            <a
              key={l}
              href="#"
              className="text-white/75 text-sm font-semibold hover:text-white transition-colors no-underline"
            >
              {l}
            </a>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/register")}
            className="bg-white/10 border border-white/20 text-white text-sm font-semibold px-4 py-2 rounded-lg backdrop-blur-md hover:bg-white/20 transition-colors cursor-pointer"
          >
            Sign up
          </button>
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-slate-900 text-sm font-bold px-4 py-2 rounded-lg hover:scale-105 transition-transform cursor-pointer"
          >
            Log in
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div className="relative h-[620px] flex flex-col items-center justify-center text-center overflow-hidden">
        {/* BG Image */}
        <div
          className="anim-zoom absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=85')",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/55 to-black/80" />

        {/* Content */}
        <div className="relative z-10 px-6 max-w-2xl w-full">
          {/* Badge */}
          <div className="anim-fade-up-1 inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            <BiPaperPlane /> AI Trip Planner
          </div>

          {/* Title */}
          <h1
            className="anim-fade-up-2 text-4xl md:text-6xl font-black text-white leading-tight tracking-tight mb-4"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
          >
            Your next adventure
            <br />
            starts <span className="text-sky-400">right here</span>
          </h1>

          {/* Subtitle */}
          <p className="anim-fade-up-3 text-white/80 text-base font-medium mb-9">
            Enter your budget and let our AI plan the perfect trip — flights,
            stays, food & more.
          </p>

          {/* ── SEARCH PILL ── */}
          <div className="anim-fade-up-4 bg-white rounded-2xl flex items-center gap-2 p-3 pl-2 mx-auto shadow-2xl max-w-9xl w-full">
            {/* Budget */}
            <div className="flex flex-col px-4 flex-1 border-r border-slate-200">
              <div className="flex items-center gap-1 mb-0.5">
                <BiSolidPlaneTakeOff className="text-sky-500 text-sm" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Budget (₹)
                </span>
              </div>
              <input
                type="number"
                placeholder="e.g. 15,000"
                onChange={(e) => setBudget(e.target.value)}
                className="text-sm font-bold text-slate-900 bg-transparent border-none outline-none placeholder:text-slate-300 placeholder:font-normal w-full"
              />
            </div>

            {/* From */}
            <div className="flex flex-col px-4 flex-1 border-r border-slate-200">
              <div className="flex items-center gap-1 mb-0.5">
                <MdLocationOn className="text-rose-400 text-sm" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  From
                </span>
              </div>
              <input
                type="text"
                placeholder="Your city"
                onChange={(e) => setFrom(e.target.value)}
                className="text-sm font-bold text-slate-900 bg-transparent border-none outline-none placeholder:text-slate-300 placeholder:font-normal w-full"
              />
            </div>

            {/* Days */}
            <div className="flex flex-col px-4 flex-1">
              <div className="flex items-center gap-1 mb-0.5">
                <BsCalendarWeek className="text-amber-400 text-sm" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Days
                </span>
              </div>
              <input
                type="number"
                placeholder="e.g. 4"
                onChange={(e) => setNumDays(e.target.value)}
                className="text-sm font-bold text-slate-900 bg-transparent border-none outline-none placeholder:text-slate-300 placeholder:font-normal w-full"
              />
            </div>
            {/* Interest */}
            <div className="flex flex-col px-4 flex-1">
              <div className="flex items-center gap-1 mb-0.5">
                <TbBulb className="text-amber-400 text-sm" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Interest
                </span>
              </div>
              <input
                type="text"
                placeholder="e.g. Beach"
                onChange={(e) => setInterest(e.target.value)}
                className="text-sm font-bold text-slate-900 bg-transparent border-none outline-none placeholder:text-slate-300 placeholder:font-normal w-full"
              />
            </div>

            {/* Search Button */}
            <button
              className="go-btn-hover bg-gradient-to-br from-sky-500 to-blue-600 text-white text-sm font-black px-6 py-3.5 rounded-xl whitespace-nowrap flex items-center gap-2 flex-shrink-0 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              onClick={getTrips}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="anim-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full inline-block" />
                  Finding...
                </>
              ) : (
                <>
                  <IoSearchSharp className="text-base" />
                  Search Trips
                </>
              )}
            </button>
          </div>
          {/* ── END SEARCH PILL ── */}
        </div>
        {/* ── END Content ── */}

        {error && (
          <div className="anim-fade-up-4 max-w-md mx-auto mt-4 bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl px-6 py-4 flex flex-col items-center gap-3 text-center">
            <span className="text-2xl">⚠️</span>
            <p className="text-white font-semibold text-sm">{error}</p>
            <button
              onClick={getTrips}
              className="bg-white text-slate-900 text-xs font-bold px-5 py-2 rounded-xl hover:scale-105 transition-transform"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Scroll hint */}
        <div className="anim-fade-up-5 absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-white/60 text-[10px] font-semibold uppercase tracking-widest">
          <span>Scroll</span>
          <span className="anim-bounce w-1.5 h-1.5 bg-white/50 rounded-full block" />
        </div>
      </div>
      {/* ── END HERO ── */}

      {/* ── RESULTS ── */}
      {(loading || aiData) && (
        <div className="max-w-6xl mx-auto px-6 py-10 pb-24">
          {/* Section header */}
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">
                {loading ? "Finding trips for you..." : `Trips from ${fromLoc}`}
              </h2>
              {!loading && (
                <p className="text-sm text-slate-500 mt-1">
                  Budget ₹{Number(budget).toLocaleString()} · {numDays} days
                </p>
              )}
            </div>
            {!loading && (
              <span className="text-xs font-bold text-sky-500 bg-sky-50 px-3 py-1.5 rounded-full">
                Top destinations found
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* ── SKELETONS ── */}
            {loading &&
              [1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200"
                >
                  <div className="skel h-52 rounded-none" />
                  <div className="p-5">
                    <div className="skel h-5 w-1/2 mb-3" />
                    <div className="skel h-3 w-4/5 mb-2" />
                    <div className="skel h-3 w-2/3 mb-6" />
                    <div className="skel h-3 w-2/5" />
                  </div>
                </div>
              ))}

            {/* ── REAL CARDS ── */}
            {!loading &&
              aiData?.places?.map((place, idx) => (
                <div
                  key={idx}
                  className="card-hover anim-card bg-white rounded-2xl overflow-hidden border border-slate-200"
                  style={{ animationDelay: `${idx * 0.12}s` }}
                >
                  {/* Image */}
                  <div
                    className="relative h-52 overflow-hidden bg-slate-200"
                    onClick={() =>
                      navigate("/TripDetails", { state: { place } })
                    }
                  >
                    <img
                      className="card-img-zoom w-full h-full object-cover block"
                      src={
                        place.imageUrl ||
                        `https://picsum.photos/seed/${encodeURIComponent(place.name)}/600/400`
                      }
                      alt={place.name}
                    />
                    {/* Price badge */}
                    <div className="absolute top-3 right-3 bg-white text-slate-900 text-sm font-extrabold px-3 py-1 rounded-full shadow-md">
                      ₹{place.cost?.total?.toLocaleString()}
                    </div>
                    {/* Rating badge */}
                    <div className="absolute bottom-3 left-3 bg-black/55 backdrop-blur text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      ⭐ 4.8
                    </div>
                  </div>

                  <div className="p-5">
                    {/* Name */}
                    <h3 className="text-lg font-extrabold text-slate-900 mb-2">
                      {place.name}
                    </h3>

                    {/* Tags */}
                    <div className="flex gap-1.5 flex-wrap mb-3">
                      {(place.tags || [place.name])
                        .slice(0, 3)
                        .map((tag, ti) => (
                          <span
                            key={ti}
                            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md ${TAG_COLORS[ti % TAG_COLORS.length]}`}
                          >
                            {tag}
                          </span>
                        ))}
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                      {place.description}
                    </p>

                    {/* Divider */}
                    <div className="h-px bg-slate-100 my-3" />

                    <div className="h-px bg-slate-100 my-3" />

                    {/* Cost breakdown */}
                    <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
                      💸 Cost Breakdown
                    </p>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[
                        {
                          label: "Travel",
                          value: place.cost?.travel,
                          dark: false,
                        },
                        { label: "Stay", value: place.cost?.stay, dark: false },
                        { label: "Food", value: place.cost?.food, dark: false },
                        {
                          label: "Total",
                          value: place.cost?.total,
                          dark: true,
                        },
                      ].map(({ label, value, dark }) => (
                        <div
                          key={label}
                          className={`rounded-xl p-2 text-center ${dark ? "bg-gradient-to-br from-sky-500 to-blue-600" : "bg-slate-50"}`}
                        >
                          <div
                            className={`text-[9px] font-bold uppercase tracking-wide ${dark ? "text-white/70" : "text-slate-400"}`}
                          >
                            {label}
                          </div>
                          <div
                            className={`text-xs font-extrabold mt-0.5 ${dark ? "text-white" : "text-slate-900"}`}
                          >
                            ₹{value?.toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={() =>
                          navigate("/TripDetails", { state: { place } })
                        }
                        className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm font-bold py-2.5 rounded-xl hover:scale-[1.02] transition-transform"
                      >
                        Plan This Trip →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="h-px bg-slate-100 my-3" />
        </div>
      )}
    </div>
  );
}
