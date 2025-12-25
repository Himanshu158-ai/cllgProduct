import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../axios";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/user/login", { formData });
      toast.success(response.data.message);
      navigate("/", { state: { user: response.data.user } });
    } catch (error) {
      toast.error(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center
      bg-linear-to-br from-[#0f172a] via-[#020617] to-black">

      <div className="w-full max-w-md p-8
        bg-[#020617]/90 backdrop-blur
        border border-slate-800 rounded-2xl shadow-2xl">

        <h2 className="text-3xl font-bold text-center text-cyan-400 mb-6">
          Login
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg
              bg-slate-900 text-white
              border border-slate-700
              focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg
              bg-slate-900 text-white
              border border-slate-700
              focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />

          <button
            className="w-full py-2 rounded-xl font-bold text-black
              bg-linear-to-r from-cyan-400 to-blue-500
              hover:from-cyan-300 hover:to-blue-400
              transition-all shadow-lg"
          >
            🚀 Login
          </button>
        </form>

        <p className="text-center text-slate-400 mt-5">
          Don't have an account?{" "}
          <Link to="/signup" className="text-cyan-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
