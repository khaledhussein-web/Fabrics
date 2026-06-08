const WEB3FORMS_URL = "https://api.web3forms.com/submit";

const getAccessKey = () =>
  String(process.env.WEB3FORMS_ACCESS_KEY || "").trim();

const sendContactNotification = async (
  { fullName, email, phone, message },
  { fetchImpl = fetch } = {}
) => {
  const accessKey = getAccessKey();
  if (!accessKey) {
    return {
      sent: false,
      reason: "not_configured",
    };
  }

  try {
    const response = await fetchImpl(WEB3FORMS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "StageWare-Contact/1.0",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: fullName,
        email,
        replyto: email,
        phone,
        message,
        from_name: "StageWare Website Contact",
        subject: "New Contact Message",
      }),
      signal: AbortSignal.timeout(10000),
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.success !== true) {
      console.error(
        `Contact notification rejected with HTTP ${response.status}:`,
        result.message || "Unknown Web3Forms error"
      );
      return {
        sent: false,
        reason: "provider_rejected",
      };
    }

    return { sent: true };
  } catch (error) {
    console.error("Contact notification failed:", error);
    return {
      sent: false,
      reason: "provider_unavailable",
    };
  }
};

module.exports = {
  WEB3FORMS_URL,
  sendContactNotification,
};
