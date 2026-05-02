// src/pages/Checkout.js
import React, { useState } from "react";
import "./Checkout.css";
import { useCart } from "../context/CartContext";
import { createOrder } from "../api/orders";
import { useNavigate } from "react-router-dom";


export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, subtotal, clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    payment: "cod",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const onChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!cartItems || cartItems.length === 0) {
      setMsg("❌ Cart is empty!");
      return;
    }

    // ✅ Backend expects: full_name, phone, address, items[{product_id, quantity}]
    const payload = {
      full_name: form.name,
      phone: form.phone,
      address: `${form.address}, ${form.city} (payment: ${form.payment})`,
      items: cartItems.map((p) => ({
        product_id: p.id,         // must be backend product id
        quantity: p.qty || 1,
      })),
    };

    try {
      setLoading(true);
      await createOrder(payload);

      clearCart();
      setMsg("✅ Order placed successfully!");

      // Redirect (change to /orders later if you want)
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      console.log("ORDER ERROR:", err);

      // token missing/expired OR backend error
      setMsg("❌ Order failed. Please login first, then try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ckPage">
      <div className="ckWrap">
        {/* LEFT: Form */}
        <div className="ckLeft">
          <h2>Checkout</h2>
          <p className="ckMuted">Fill your delivery details</p>

          <form className="ckForm" onSubmit={placeOrder}>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Full Name"
              required
            />

            <input
              name="phone"
              value={form.phone}
              onChange={onChange}
              placeholder="Phone Number"
              required
            />

            <textarea
              name="address"
              value={form.address}
              onChange={onChange}
              placeholder="Full Address"
              rows="4"
              required
            />

            <div className="ckRow">
              <input
                name="city"
                value={form.city}
                onChange={onChange}
                placeholder="City"
                required
              />

              <select name="payment" value={form.payment} onChange={onChange}>
                <option value="cod">Cash on Delivery</option>
                <option value="bkash">bKash (Later)</option>
                <option value="card">Card (Later)</option>
              </select>
            </div>

            <button
              className="ckBtn"
              type="submit"
              disabled={cartItems.length === 0 || loading}
            >
              {loading ? "Placing..." : "Place Order"}
            </button>

            {msg && <p style={{ marginTop: 12 }}>{msg}</p>}
          </form>
        </div>

        {/* RIGHT: Summary */}
        <div className="ckRight">
          <div className="ckCard">
            <h3>Order Summary</h3>

            {cartItems.length === 0 ? (
              <p className="ckMuted">No items in cart</p>
            ) : (
              <>
                <div className="ckItems">
                  {cartItems.map((p) => (
                    <div key={p.id} className="ckItem">
                      <img
                        src={p.img || "/placeholder.jpg"}
                        alt={p.name}
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.jpg";
                        }}
                      />

                      <div className="ckItemInfo">
                        <b>{p.name}</b>
                        <p className="ckMuted">
                          ${Number(p.price).toFixed(2)} × {p.qty || 1}
                        </p>
                      </div>

                      <div className="ckItemTotal">
                        ${(Number(p.price) * (p.qty || 1)).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="ckLine" />

                <div className="ckTotalRow">
                  <span>Subtotal</span>
                  <b>${Number(subtotal).toFixed(2)}</b>
                </div>

                <div className="ckTotalRow">
                  <span>Shipping</span>
                  <b>$0.00</b>
                </div>

                <div className="ckLine" />

                <div className="ckGrand">
                  <span>Total</span>
                  <b>${Number(subtotal).toFixed(2)}</b>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
