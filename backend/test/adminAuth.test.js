const test = require("node:test");
const assert = require("node:assert/strict");
const { requireAdminAuth } = require("../security");

const STRONG_TOKEN =
  "8fda957541ed5a52ee565c9d0ea73a885ed48a36652b6f96d9d5551f68722283";

const makeRequest = (headers) => ({
  get(name) {
    return headers[name.toLowerCase()] || "";
  },
});

const unusedResponse = {
  locals: {},
  status() {
    throw new Error("A valid admin token must not produce an error response");
  },
};

const restoreEnv = (name, value) => {
  if (value === undefined) delete process.env[name];
  else process.env[name] = value;
};

test("admin auth accepts Authorization Bearer tokens", () => {
  const previousToken = process.env.ADMIN_API_TOKEN;
  const previousEnv = process.env.NODE_ENV;
  process.env.ADMIN_API_TOKEN = STRONG_TOKEN;
  process.env.NODE_ENV = "production";

  let nextCalled = false;
  try {
    requireAdminAuth(
      makeRequest({ authorization: `Bearer ${STRONG_TOKEN}` }),
      unusedResponse,
      () => {
        nextCalled = true;
      }
    );
  } finally {
    restoreEnv("ADMIN_API_TOKEN", previousToken);
    restoreEnv("NODE_ENV", previousEnv);
  }

  assert.equal(nextCalled, true);
});

test("admin auth accepts X-Admin-Token headers", () => {
  const previousToken = process.env.ADMIN_API_TOKEN;
  const previousEnv = process.env.NODE_ENV;
  process.env.ADMIN_API_TOKEN = STRONG_TOKEN;
  process.env.NODE_ENV = "production";

  let nextCalled = false;
  try {
    requireAdminAuth(
      makeRequest({ "x-admin-token": STRONG_TOKEN }),
      unusedResponse,
      () => {
        nextCalled = true;
      }
    );
  } finally {
    restoreEnv("ADMIN_API_TOKEN", previousToken);
    restoreEnv("NODE_ENV", previousEnv);
  }

  assert.equal(nextCalled, true);
});
