import React, { useState } from "react";
import '../../assets/Contact.css';

export default function Contact({ t }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const data = {
      access_key: "85557aa4-5508-4ecb-9819-3a11e23b9f61",
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message,
      from_name: "Fabrics Website Contact",
      subject: "New Contact Message"
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        showToast(t?.contact?.success || "Message sent successfully!");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        showToast(t?.contact?.error || "Failed to send the message.");
      }
    } catch (error) {
      showToast(t?.contact?.error || "Something went wrong.");
      console.error(error);
    }
  };

  return (
    <div className="contact-page" dir={t.dir}>
      <section className="contact-form-section">
        <h1>{t?.contact?.title || "Contact Us"}</h1>

        {/* FIXED: using onSubmit instead of handleSubmit */}
        <form onSubmit={onSubmit} className="contact-form">

          <label>{t?.contact?.form?.name || "Full Name"}</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            placeholder="Your Name"
            name="name"
          />

          <label>{t?.contact?.form?.email || "Email"}</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            placeholder="you@example.com"
            name="email"
          />

          <label>{t?.contact?.form?.phone || "Phone"}</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
            placeholder="Your Phone Number"
            name="phone"
          />

          <label>{t?.contact?.form?.message || "Message"}</label>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            placeholder="Write your message..."
            name="message"
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
          style={{ width: "30px", height: "30px" }}
        />
      </a>
    </div>
  );
}
