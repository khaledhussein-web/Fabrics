import React, { useState } from "react";
import "../assets/Contact.css";

export default function Contact({ t, dir }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast(t?.contact?.success || "Thanks! We will contact you soon.");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="contact-page" dir={t.dir}>
      <section className="contact-form-section">
        <h1>{t?.contact?.title || "Contact Us"}</h1>
        <form onSubmit={handleSubmit} className="contact-form">
          <label>{t?.contact?.form?.name || "Full Name"}</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            placeholder="Your Name"
          />

          <label>{t?.contact?.form?.email || "Email"}</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            placeholder="you@example.com"
          />

          <label>{t?.contact?.form?.phone || "Phone"}</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
            placeholder="Your Phone Number"
          />

          <label>{t?.contact?.form?.message || "Message"}</label>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            placeholder="Write your message..."
          ></textarea>

          <button className="btn-primary" type="submit">
            {t?.contact?.form?.send || "Send Message"}
          </button>
        </form>
      </section>

      <section className="company-details">
        <h2>{t?.contact?.company?.title || "Company Information"}</h2>
        <div className="company-info">
          <div className="info-item">
            <strong>{t?.contact?.form?.address || "Address"}:</strong>
            <p>{t?.contact?.company?.address || "123 Main Street, Beirut, Lebanon"}</p>
          </div>
          <div className="info-item">
            <strong>{t?.contact?.form?.phone || "Phone"}:</strong>
            <p>{t?.contact?.company?.phone || "+961 1 234 567"}</p>
          </div>
          <div className="info-item">
            <strong>{t?.contact?.form?.email || "Email"}:</strong>
            <p>{t?.contact?.company?.email || "info@stageware.com"}</p>
          </div>
        </div>
      </section>

      {/* Toast Notification */}
      {toast && <div id="toast" className="toast">{toast}</div>}

      <a
        href="https://wa.me/your-phone-number?text=Hello"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Contact us on WhatsApp"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
          alt="WhatsApp"
          style={{ width: '30px', height: '30px' }}
        />
      </a>
    </div>
  );
}