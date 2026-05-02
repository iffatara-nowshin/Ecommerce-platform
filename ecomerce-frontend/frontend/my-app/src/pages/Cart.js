import React, { useState } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const BACKEND = "http://127.0.0.1:8000";

const getImageUrl = (item) => {
  if (item.img) return item.img; // old static support
  if (!item.image) return "/images/placeholder.jpg";
  if (item.image.startsWith("http")) return item.image;
  return `${BACKEND}${item.image}`;
};

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, changeQty, subtotal } = useCart();

  const [note, setNote] = useState("");
  const [agree, setAgree] = useState(false);

  const goCheckout = () => {
    navigate("/checkout", { state: { note } });
  };

  return (
    <div className="cartPage">
      <div className="cartWrap">
        {/* LEFT */}
        <div className="cartLeft">
          <div className="cartHead">
            <div>PRODUCT</div>
            <div>PRICE</div>
            <div>QTY</div>
            <div>TOTAL</div>
          </div>

          {cartItems.length === 0 && (
            <p style={{ padding: "20px", opacity: 0.6 }}>Your cart is empty</p>
          )}

          {cartItems.map((it) => {
            const price = Number(it.price);
            const qty = Number(it.qty || 1);

            return (
              <div key={it.id} className="cartRow">
                <div className="cartProd">
                  <button
                    className="xBtn"
                    onClick={() => removeFromCart(it.id)}
                    title="Remove"
                  >
                    ×
                  </button>

                  <div className="thumb">
                    <img src={getImageUrl(it)} alt={it.name} />
                  </div>

                  <div className="prodText">
                    <h4>{it.name}</h4>
                  </div>
                </div>

                <div className="cartPrice">৳{price.toFixed(2)}</div>

                <div className="qtyBox">
                  <button onClick={() => changeQty(it.id, "dec")}>−</button>
                  <span>{qty}</span>
                  <button onClick={() => changeQty(it.id, "inc")}>+</button>
                </div>

                <div className="cartTotal">৳{(price * qty).toFixed(2)}</div>
              </div>
            );
          })}

          <div className="noteBox">
            <p className="noteTitle">ADD A NOTE</p>
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Some words to Carryonix team"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="cartRight">
          <div className="rightInner">
            <div className="line" />

            <p className="smallTitle">CART TOTAL</p>

            <div className="grand">
              <span>৳{Number(subtotal).toFixed(2)}</span>
            </div>

            <p className="smallMuted">Shipping & taxes calculated at checkout</p>

            <label className="agree">
              <input
                type="checkbox"
                checked={agree}
                onChange={() => setAgree(!agree)}
              />
              <span>
                I agree to <a href="/terms">Terms & Conditions</a>
              </span>
            </label>

            <button
              className="checkoutBtn"
              disabled={!agree || cartItems.length === 0}
              onClick={goCheckout}
            >
              CHECKOUT
            </button>

            <button
              className="paypalBtn"
              disabled={!agree || cartItems.length === 0}
              onClick={() => alert("PayPal will be added later!")}
            >
              PayPal
            </button>

            <div className="bagIcon">👜</div>
          </div>
        </div>
      </div>
    </div>
  );
}
