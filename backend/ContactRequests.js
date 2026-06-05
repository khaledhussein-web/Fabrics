const express = require("express");
const pool = require("./db");
const {
  ERROR_CODES,
  createRateLimiter,
  sanitizeText,
  sendPublicError,
  sendServerError,
} = require("./security");

const router = express.Router();

const contactLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 5,
  keyPrefix: "contact-submit",
});

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+().\s-]{6,30}$/;

const sendContactNotification = async ({ fullName, email, phone, message }) => {
  const accessKey = String(process.env.WEB3FORMS_ACCESS_KEY || "").trim();
  if (!accessKey) return;

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: fullName,
        email,
        phone,
        message,
        from_name: "StageWare Website Contact",
        subject: "New Contact Message",
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      console.error(`Contact notification failed with HTTP ${response.status}`);
    }
  } catch (error) {
    console.error("Contact notification failed:", error);
  }
};

router.post("/contact-requests", contactLimiter, async (req, res) => {
  const fullName = sanitizeText(req.body?.name, {
    maxLength: 100,
    required: true,
  });
  const sanitizedEmail = sanitizeText(req.body?.email, {
    maxLength: 150,
    required: true,
  });
  const email = sanitizedEmail ? sanitizedEmail.toLowerCase() : null;
  const phone = sanitizeText(req.body?.phone, {
    maxLength: 30,
    required: true,
  });
  const message = sanitizeText(req.body?.message, {
    maxLength: 5000,
    required: true,
  });

  if (!fullName || !email || !phone || !message) {
    return sendPublicError(
      res,
      400,
      ERROR_CODES.BAD_REQUEST,
      "Name, email, phone, and message are required."
    );
  }

  if (!EMAIL_PATTERN.test(email)) {
    return sendPublicError(
      res,
      400,
      ERROR_CODES.BAD_REQUEST,
      "Invalid email address."
    );
  }

  if (!PHONE_PATTERN.test(phone)) {
    return sendPublicError(
      res,
      400,
      ERROR_CODES.BAD_REQUEST,
      "Invalid phone number."
    );
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO contact_requests (full_name, email, phone, message)
       VALUES ($1, $2, $3, $4)
       RETURNING id, submitted_at`,
      [fullName, email, phone, message]
    );

    void sendContactNotification({
      fullName,
      email,
      phone,
      message,
    });

    return res.status(201).json({
      success: true,
      requestId: res.locals.requestId,
      contactRequestId: rows[0].id,
      submittedAt: rows[0].submitted_at,
    });
  } catch (error) {
    return sendServerError(res, error, "Unable to submit contact request.");
  }
});

module.exports = router;
