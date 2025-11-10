const functions = require("firebase-functions");
const brevoLib = require("@getbrevo/brevo");

exports.sendContactEmail = functions.https.onRequest(async (req, res) => {
  // Set CORS headers
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  // ✅ Initialize Brevo Email API using environment variable
  const brevo = new brevoLib.TransactionalEmailsApi();
  brevo.setApiKey(
    brevoLib.TransactionalEmailsApiApiKeys.apiKey,
    functions.config().brevo.api_key
  );

       if (req.headers["content-type"] === "application/json" && !req.body) {
      try {
        req.body = JSON.parse(req.rawBody.toString());
      } catch (e) {
        return res.status(400).send("Invalid JSON");
      }
    }
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    const { name, email, phone, message, lang } = req.body;

    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const date = new Date().toLocaleString("en-US", { timeZone: "Asia/Beirut" });

    const isArabic = lang === "ar";

    const adminEmailHTML = `
      <div style="font-family:Arial; padding:20px;">
        <h2 style="color:#c49b34;">New Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong><br>${message}</p>
        <hr>
        <p><small>IP: ${ip}</small></p>
        <p><small>Sent at: ${date}</small></p>
      </div>
    `;

    const customerReplyHTML = isArabic
      ? `
        <div style="font-family:Arial; padding:20px; direction:rtl; text-align:right;">
          <h3>شكراً لتواصلك معنا</h3>
          <p>لقد استلمنا رسالتك وسنقوم بالرد عليك قريباً.</p>
          <p>مع التحية،<br>فريق Stageware</p>
        </div>`
      : `
        <div style="font-family:Arial; padding:20px;">
          <h3>Thank you for contacting us</h3>
          <p>We have received your message and will reply shortly.</p>
          <p>Best regards,<br>Stageware Team</p>
        </div>`;

    try {
      // ✅ Email to Admin
      await brevo.sendTransacEmail({
        sender: { email: "Naderarmoush@stagewareltd.co.uk" },
        to: [{ email: "Naderarmoush@stagewareltd.co.uk" }],
        subject: `New Website Contact Request — ${name}`,
        htmlContent: adminEmailHTML,
      });

      // ✅ Reply email to customer
      await brevo.sendTransacEmail({
        sender: { email: "Naderarmoush@stagewareltd.co.uk" },
        to: [{ email }],
        subject: isArabic ? "تم استلام رسالتك" : "Your message was received",
        htmlContent: customerReplyHTML,
      });

      return res.status(200).json({ success: true });

    } catch (error) {
      console.error("Brevo Email Error:", error);
      return res.status(500).json({ success: false });
    }
});
