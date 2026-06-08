const test = require("node:test");
const assert = require("node:assert/strict");
const {
  WEB3FORMS_URL,
  sendContactNotification,
} = require("../contactNotification");

const contact = {
  fullName: "Test Person",
  email: "test@example.com",
  phone: "+44 7000 000000",
  message: "Please contact me.",
};

const restoreAccessKey = (value) => {
  if (value === undefined) delete process.env.WEB3FORMS_ACCESS_KEY;
  else process.env.WEB3FORMS_ACCESS_KEY = value;
};

test("reports when email notifications are not configured", async () => {
  const previous = process.env.WEB3FORMS_ACCESS_KEY;
  delete process.env.WEB3FORMS_ACCESS_KEY;

  try {
    const result = await sendContactNotification(contact, {
      fetchImpl: () => {
        throw new Error("fetch should not be called");
      },
    });

    assert.deepEqual(result, {
      sent: false,
      reason: "not_configured",
    });
  } finally {
    restoreAccessKey(previous);
  }
});

test("confirms a successful Web3Forms delivery", async () => {
  const previous = process.env.WEB3FORMS_ACCESS_KEY;
  process.env.WEB3FORMS_ACCESS_KEY = "test-access-key";

  try {
    const result = await sendContactNotification(contact, {
      fetchImpl: async (url, options) => {
        assert.equal(url, WEB3FORMS_URL);
        const body = JSON.parse(options.body);
        assert.equal(body.access_key, "test-access-key");
        assert.equal(body.replyto, contact.email);
        assert.equal(options.headers["User-Agent"], "StageWare-Contact/1.0");

        return {
          ok: true,
          status: 200,
          json: async () => ({ success: true }),
        };
      },
    });

    assert.deepEqual(result, { sent: true });
  } finally {
    restoreAccessKey(previous);
  }
});

test("does not report delivery when Web3Forms rejects the request", async () => {
  const previous = process.env.WEB3FORMS_ACCESS_KEY;
  process.env.WEB3FORMS_ACCESS_KEY = "invalid-key";

  try {
    const result = await sendContactNotification(contact, {
      fetchImpl: async () => ({
        ok: true,
        status: 200,
        json: async () => ({ success: false, message: "Invalid access key" }),
      }),
    });

    assert.deepEqual(result, {
      sent: false,
      reason: "provider_rejected",
    });
  } finally {
    restoreAccessKey(previous);
  }
});
