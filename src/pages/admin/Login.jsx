import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to sign in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-[#172A3A] p-10 rounded-2xl shadow-2xl border border-white/10">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-gradient-to-br from-[#C9A45C] to-[#d4af37] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#C9A45C]/20">
              <span className="text-[#0a0a0a] font-bold text-3xl">B</span>
            </div>
            <h1 className="font-['Manrope'] font-bold text-3xl text-white mb-2">Admin Login</h1>
            <p className="text-white/50">Sign in to manage your salon</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
              <input name="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required className="w-full px-4 py-3 bg-white/10 text-white rounded-xl border border-white/10 focus:border-[#C9A45C] focus:ring-1 focus:ring-[#C9A45C]" placeholder="admin@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Password</label>
              <input name="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required className="w-full px-4 py-3 bg-white/10 text-white rounded-xl border border-white/10 focus:border-[#C9A45C] focus:ring-1 focus:ring-[#C9A45C]" placeholder="admin123" />
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-[#C9A45C] to-[#d4af37] text-[#0a0a0a] py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#C9A45C]/20 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60">
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>
          <div className="mt-6 text-center">
            <a href="/" className="text-[#C9A45C] hover:text-[#d4af37] text-sm font-medium">← Back to Website</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
