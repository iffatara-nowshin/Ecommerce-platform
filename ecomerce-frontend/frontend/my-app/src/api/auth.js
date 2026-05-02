// src/api/auth.js
import api from "./axios";

export async function login(username, password) {
  const res = await api.post("/api/auth/login/", { username, password });
  localStorage.setItem("access", res.data.access);
  localStorage.setItem("refresh", res.data.refresh);
  return res.data;
}

export function logout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
}
