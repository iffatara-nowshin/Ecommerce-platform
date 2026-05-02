// src/pages/Contact.js
import React, { useState } from "react";
import "./SimplePage.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! (Demo)");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="simplePage">
      <div className="simpleCard">
        <h1>Contact</h1>
        <p className="muted">
          Have a question? Send us a message. (Later we will connect this to Django)
        </p>

        <form className="simpleForm" onSubmit={onSubmit}>
          <input
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={onChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Your email"
            value={form.email}
            onChange={onChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your message"
            rows="5"
            value={form.message}
            onChange={onChange}
            required
          />
          <button type="submit">Send Message</button>
        </form>

        <div className="simpleInfo">
          <p><b>Email:</b> support@carryonix.com</p>
          <p><b>Phone:</b> +880 1XXXXXXXXX</p>
          <p><b>Address:</b> Dhaka, Bangladesh</p>
        </div>
      </div>
    </div>
  );
}
