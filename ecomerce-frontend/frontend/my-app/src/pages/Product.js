import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Products.css";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Products() {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch products from backend
  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/store/products/");
        setProducts(res.data || []);
      } catch (e) {
        console.log("Fetch products error:", e);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  // group by category (backend returns category object)
  const grouped = useMemo(() => {
    const map = {};
    for (const p of products) {
      const key = p.category?.slug || "others";
      const title = p.category?.name || "Others";
      if (!map[key]) map[key] = { key, title, items: [] };
      map[key].items.push(p);
    }
    return Object.values(map);
  }, [products]);

  const rowRefs = useRef({});

  const scrollRow = (key, dir) => {
    const el = rowRefs.current[key];
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="plPage">
        <div className="plWrap">
          <h2>Loading products...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="plPage">
      <div className="plWrap">
        <div className="plHead">
          <h2>Products</h2>
        </div>

        {grouped.length === 0 && (
          <p style={{ padding: 20, opacity: 0.7 }}>
            No products found. Add products from Django admin.
          </p>
        )}

        {grouped.map((c) => (
          <section key={c.key} className="plSection">
            <div className="plHead">
              <h3>{c.title}</h3>
              <div className="plArrows">
                <button onClick={() => scrollRow(c.key, "left")} className="iconBtn">
                  ‹
                </button>
                <button onClick={() => scrollRow(c.key, "right")} className="iconBtn">
                  ›
                </button>
              </div>
            </div>

            <div className="prodRow" ref={(node) => (rowRefs.current[c.key] = node)}>
              {c.items.map((p) => (
                <div key={p.id} className="prodCard">
                  <div className="prodImg">
                    <img
                      src={p.image || "/images/placeholder.jpg"}
                      alt={p.name}
                      onError={(e) => {
                        e.currentTarget.src = "/images/placeholder.jpg";
                      }}
                    />
                  </div>

                  <div className="prodInfo">
                    <p className="prodName">{p.name}</p>
                    <div className="prodBottom">
                      <b className="prodPrice">৳{Number(p.price).toFixed(2)}</b>

                      <button
                        className="addBtn"
                        type="button"
                        onClick={() => {
                          // cart এ compatible shape
                          addToCart({
                            id: p.id,
                            name: p.name,
                            price: Number(p.price),
                            img: p.image || "/images/placeholder.jpg",
                          });
                          navigate("/cart");
                        }}
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
