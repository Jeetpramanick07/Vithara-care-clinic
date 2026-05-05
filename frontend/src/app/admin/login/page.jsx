"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest, setToken } from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "admin",
    password: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    error: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setStatus({
      loading: true,
      error: "",
    });
  
    try {
      const data = await apiRequest("/auth/login", {
        method: "POST",
        body: formData,
      });
  
      const token = data.token;
  
      if (!token) {
        throw new Error("Login failed. Token not received.");
      }
  
      setToken(token);
      router.push("/admin/dashboard");
    } catch (error) {
      setStatus({
        loading: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Invalid username or password.",
      });
    }
  };
  
  return (
    <main className="admin-login-page">
      <section className="admin-login-card">
        <div className="admin-login-brand">
          <img
            src="/vithara-logo.png"
            alt="Vithara Care Clinic"
            className="admin-login-logo"
          />

          <div>
            <p className="admin-login-label">Admin Login</p>
            <h1>Care Pulse Dashboard</h1>
            <p className="admin-login-subtitle">
              Secure access for managing Care Journal posts and appointment
              requests.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter admin username"
              required
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter admin password"
              required
            />
          </div>

          {status.error && <div className="admin-login-error">{status.error}</div>}

          <button
            type="submit"
            className="admin-login-button"
            disabled={status.loading}
          >
            {status.loading ? "Signing in..." : "Sign in to Dashboard"}
          </button>
        </form>

        <p className="admin-login-note">
          Authorized clinic administrators only.
        </p>
      </section>
    </main>
  );
}