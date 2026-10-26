/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { FaEnvelope, FaLock, FaSignInAlt, FaArrowLeft } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (authError) throw authError;

      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed", err);
      setError("Login failed: Incorrect email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 to-slate-900 text-white p-4 md:p-6">
      <div className="bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-2xl max-w-md w-full shadow-2xl border border-white/20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-yellow-400 transition-colors mb-6 md:mb-8"
        >
          <FaArrowLeft /> Kembali ke Beranda
        </Link>

        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-300 mb-2">
            Login Admin
          </h2>
          <p className="text-gray-300 text-sm md:text-base px-2">
            Masuk untuk mengelola event God's Whisper gereja Anda.
          </p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 md:space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Email
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-4 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-sm md:text-base pl-10 pr-4 py-3 bg-slate-800/50 rounded-xl border border-slate-700 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition"
                placeholder="email@gereja.org"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-4 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-sm md:text-base pl-10 pr-4 py-3 bg-slate-800/50 rounded-xl border border-slate-700 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition"
                placeholder="••••••••••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-xl transition-all active:scale-95 disabled:opacity-50 mt-8 cursor-pointer"
          >
            <FaSignInAlt /> {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <div className="mt-6 text-center  text-sm text-gray-400">
          Belum mendaftarkan gereja Anda? <br />
          <Link
            to="/register"
            className="text-yellow-400 hover:underline font-medium mt-1 inline-block"
          >
            Ajukan Pendaftaran di sini
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
