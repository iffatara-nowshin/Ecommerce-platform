import React, { useState } from "react";
import { login, logout } from "../api/auth";
import api from "../api/axios";

export default function TestApi() {
  const [username, setUsername] = useState("acer");
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState([]);
  const [msg, setMsg] = useState("");

  const handleLogin = async () => {
    try {
      await login(username, password);
      setMsg("✅ Login success");
    } catch (e) {
      setMsg("❌ Login failed (username/password check করো)");
    }
  };

  const handleFetchProducts = async () => {
    try {
      const res = await api.get("/api/store/products/");
      setProducts(res.data);
      setMsg(`✅ Products loaded: ${res.data.length}`);
    } catch (e) {
      setMsg("❌ Products fetch failed");
    }
  };

  const handleLogout = () => {
    logout();
    setProducts([]);
    setMsg("✅ Logged out");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>API Test Page</h2>

      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
        <input
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleFetchProducts}>Fetch Products</button>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <p>{msg}</p>

      <pre style={{ background: "#111", color: "#0f0", padding: 10 }}>
        {JSON.stringify(products, null, 2)}
      </pre>
    </div>
  );
}
