// src/pages/About.js
import React from "react";
import "./SimplePage.css";

export default function About() {
  return (
    <div className="simplePage">
      <div className="simpleCard">
        <h1>About Carryonix</h1>
        <p>
          Carryonix is a bag brand focused on premium quality, comfort, and
          minimal design for everyday life.
        </p>

        <div className="simpleGrid">
          <div>
            <h4>What we sell</h4>
            <ul>
              <li>Laptop Bags</li>
              <li>Casual Bags</li>
              <li>Women’s Bags</li>
              <li>Backpacks</li>
              <li>Travel Bags</li>
            </ul>
          </div>

          <div>
            <h4>Why choose us</h4>
            <ul>
              <li>Premium materials</li>
              <li>Modern design</li>
              <li>Reliable delivery</li>
              <li>Easy return policy</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
