import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import { apiClient } from "../../lib/apiClient";
import { useAuth } from "../../context/AuthContext";

const loginSchema = z.object({
  email: z.string().email("Valid email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: (data) => apiClient.post("/auth/login", data),
    onSuccess: async (res) => {
      await login(res.data.data.user.email, res.data.data.user.password || "");
      navigate("/admin", { replace: true });
    },
  });

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white p-10 rounded-sm shadow-2xl">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-primary font-bold text-2xl">B</span>
            </div>
            <h1 className="font-heading font-bold text-2xl text-primary">Admin Login</h1>
            <p className="text-muted mt-2">Sign in to manage your salon</p>
          </div>

          <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Email</label>
              <input {...register("email")} type="email" className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:ring-2 focus:ring-accent focus:border-transparent" placeholder="admin@example.com" />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Password</label>
              <div className="relative">
                <input {...register("password")} type={showPassword ? "text" : "password"} className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:ring-2 focus:ring-accent focus:border-transparent pr-10" placeholder="admin123" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-muted hover:text-primary">
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
            <button type="submit" disabled={mutation.isLoading} className="btn-primary w-full disabled:opacity-50">
              {mutation.isLoading ? "Signing in..." : "Sign In"}
            </button>
            {mutation.isError && <p className="text-red-500 text-sm text-center">Invalid credentials</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
