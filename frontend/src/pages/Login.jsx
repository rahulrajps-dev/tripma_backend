import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex font-sans bg-slate-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
      `}</style>

      {/* LEFT SIDE */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-sky-500 to-blue-700 relative overflow-hidden">
        
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop"
          alt="travel"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />

        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-6 w-fit">
            ✈ AI Travel Planner
          </div>

          <h1 className="text-5xl font-black leading-tight mb-6">
            Plan Smart <br />
            Travel Better
          </h1>

          <p className="text-white/80 text-lg leading-relaxed max-w-md">
            Discover AI-powered travel itineraries, hotels, and personalized
            destination recommendations for your next adventure.
          </p>

          <div className="flex gap-4 mt-10">
            <div className="bg-white/10 border border-white/20 px-5 py-3 rounded-2xl">
              <div className="text-2xl font-black">100+</div>
              <div className="text-sm text-white/70">
                Destinations
              </div>
            </div>

            <div className="bg-white/10 border border-white/20 px-5 py-3 rounded-2xl">
              <div className="text-2xl font-black">AI</div>
              <div className="text-sm text-white/70">
                Powered Trips
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-slate-200">

          {/* LOGO */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black text-slate-900">
              Trip<span className="text-sky-500">ma</span>
            </h1>

            <p className="text-slate-500 mt-3">
              Welcome back! Login to continue your journey.
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-medium rounded-2xl px-4 py-3 mb-5">
              {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500 transition"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500 transition"
              />
            </div>

            {/* FORGOT */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm font-bold text-sky-600 hover:text-sky-700"
              >
                Forgot password?
              </button>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold py-3 rounded-2xl hover:scale-[1.01] transition-transform shadow-lg"
            >
              Login
            </button>
          </form>

          {/* SIGNUP */}
          <div className="text-center mt-6">
            <p className="text-sm text-slate-500">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/Register")}
                className="text-sky-600 font-bold cursor-pointer hover:text-sky-700"
              >
                Sign up
              </span>
            </p>
          </div>

          {/* DEMO */}
          <div className="mt-8 bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <p className="text-xs text-slate-500 text-center leading-relaxed">
              Secure login to save trips, manage bookings, and access your
              personalized AI travel plans.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}