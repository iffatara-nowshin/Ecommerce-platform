// src/api/orders.js
import api from "./axios";

export async function createOrder(payload) {
  const res = await api.post("/api/orders/create/", payload);
  return res.data;
}

export async function myOrders() {
  const res = await api.get("/api/orders/my/");
  return res.data;
}
