// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// ✅ Request interceptor: access token থাকলে header এ বসাবে
api.interceptors.request.use((config) => {
  const access = localStorage.getItem("access");
  if (access) {
    config.headers.Authorization = `Bearer ${access}`;
  }
  return config;
});

// ✅ Response interceptor: 401 হলে refresh দিয়ে নতুন access নিয়ে retry করবে
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    // যদি 401 হয় এবং আগে retry না করে থাকে
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      const refresh = localStorage.getItem("refresh");
      if (!refresh) return Promise.reject(error);

      try {
        // তোমার backend এ refresh endpoint যেটা আছে সেটার সাথে মিলাও:
        // সাধারণত: /api/auth/refresh/
        const r = await axios.post("http://127.0.0.1:8000/api/auth/refresh/", {
          refresh,
        });

        localStorage.setItem("access", r.data.access);

        // নতুন token দিয়ে আগের request আবার পাঠাবে
        original.headers.Authorization = `Bearer ${r.data.access}`;
        return api(original);
      } catch (e) {
        // refresh fail হলে লগআউট টাইপ আচরণ
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
