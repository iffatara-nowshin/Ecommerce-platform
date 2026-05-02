// src/pages/Login.js
import React, { useState } from "react";
import "./Login.css";
import { useNavigate, useLocation } from "react-router-dom";

// ✅ your API login function
import { login } from "../api/auth";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ যদি checkout থেকে redirect হয়, তাহলে login এর পরে ওখানেই যাবে
  const redirectTo = location.state?.from || "/";

  const [form, setForm] = useState({
    username: "", // ✅ Django username
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const onChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!form.username || !form.password) {
      setMsg("Username & password required.");
      return;
    }

    try {
      setLoading(true);
      await login(form.username, form.password); // ✅ saves access/refresh in localStorage

      // ✅ confirm token saved
      const token = localStorage.getItem("access");
      if (!token) {
        setMsg("Login success but token not saved. Check auth.js");
        return;
      }

      setMsg("✅ Login successful!");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setMsg("❌ Login failed. Check username/password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginPage">
      <div className="loginBox">
        <h2 className="loginTitle">Welcome Back</h2>
        <p className="loginSub">Login to your Carryonix account</p>

        <form className="loginForm" onSubmit={handleLogin}>
          {/* ✅ Username */}
          <label>Username</label>
          <input
            name="username"
            value={form.username}
            onChange={onChange}
            placeholder="Enter your username (e.g. acer)"
          />

          {/* ✅ Password */}
          <label>Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            placeholder="Enter your password"
          />

          {/* message */}
          {msg && (
            <p style={{ marginTop: 10, color: msg.includes("✅") ? "green" : "crimson" }}>
              {msg}
            </p>
          )}

          <button type="submit" className="loginBtn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="loginSmall">
            Don’t have an account? <span>Create one</span>
          </p>
        </form>
      </div>
    </div>
  );
}
