import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import "../../assets/contact.css";
import Seo from "../../components/Seo";
import { toApiUrl } from "../../config/env";

export default function Contact({ t }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [whatsAppUrl, setWhatsAppUrl] = useState("https://wa.me/447441922124?text=Hello");

  useEffect(() => {
    const fetchWhatsAppUrl = async () => {
      try {
        const response = await fetch(toApiUrl("/api/config/whatsapp"));
        if (!response.ok) return;
        const data = await response.json();
        if (data?.chatUrl) {
          setWhatsAppUrl(data.chatUrl);
        }
      } catch (error) {
        console.error("Failed to load WhatsApp link:", error);
      }
    };

    fetchWhatsAppUrl();
  }, []);

  const showToast = (msg, type = "success") => {
    setToast(msg);
    setToastType(type);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const contactData = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message,
    };

    try {
      const response = await fetch(toApiUrl("/api/contact-requests"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(contactData),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to save contact request.");
      }

      showToast(t?.contact?.success || "Message sent successfully!");
      setIsSent(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      showToast(t?.contact?.error || "Something went wrong.", "error");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-page" dir="ltr">
      <Seo
        title="Contact Us | StageWare"
        description="Contact StageWare for enquiries about fabrics, flooring, tracks, and frame systems."
      />
      <section className="contact-form-section">
        <h1>{t?.contact?.title || "Contact Us"}</h1>

        <form onSubmit={onSubmit} className="contact-form">
          <label>{t?.contact?.form?.name || "Full Name"}</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => { setForm({ ...form, name: e.target.value }); setIsSent(false); }}
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
            onChange={(e) => { setForm({ ...form, phone: e.target.value }); setIsSent(false); }}
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

          <button
            className="btn-primary"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="spinner"></div>
            ) : (
              t?.contact?.form?.send || "Send Message"
            )}
          </button>

          {isSent && (
            <div className="success-box">
              <span className="checkmark">{"\u2713"}</span>
              {t?.contact?.success || "Thanks! We will contact you soon."}
            </div>
          )}
        </form>
      </section>

      <section className="company-details">
        <h2>{t?.contact?.company?.title || "Company Information"}</h2>
        <div className="company-info">
          <div className="info-item">
            <strong>{t?.contact?.form?.address || "Address"}:</strong>
            <p>{t?.contact?.company?.address || "61 Bridge Street, Kingston, HR5 3DJ, United Kingdom"}</p>
          </div>
          <div className="info-item">
            <strong>{t?.contact?.form?.phone || "Phone"}:</strong>
            <p>{t?.contact?.company?.phone || "+44 7441 922124"}</p>
          </div>
          <div className="info-item">
            <strong>{t?.contact?.form?.email || "Email"}:</strong>
            <p>{t?.contact?.company?.email || "info@stageware.com"}</p>
          </div>
        </div>
      </section>

      {toast && (
        <div id="toast" className={toastType === "error" ? "toast error" : "toast"}>
          {toast}
        </div>
      )}

      <a
        href={whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Contact us on WhatsApp"
      >
        <FaWhatsapp aria-hidden="true" />
      </a>
    </div>
  );
}
