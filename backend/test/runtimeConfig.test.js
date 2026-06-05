const test = require("node:test");
const assert = require("node:assert/strict");
const {
  isProductionAdminTokenAllowed,
  validateProductionAdminToken,
} = require("../runtimeConfig");

const validateProductionToken = (adminToken) =>
  validateProductionAdminToken({
    nodeEnv: "production",
    adminToken,
  });

test("production rejects a missing admin token", () => {
  assert.throws(
    () => validateProductionToken(""),
    /ADMIN_API_TOKEN is required/
  );
});

test("production rejects the documented placeholder admin token", () => {
  assert.throws(
    () => validateProductionToken("change_this_to_a_long_random_secret"),
    /placeholder or weak value/
  );
  assert.equal(
    isProductionAdminTokenAllowed({
      nodeEnv: "production",
      adminToken: "change_this_to_a_long_random_secret",
    }),
    false
  );
});

test("production rejects short and common weak admin tokens", () => {
  for (const token of ["admin", "password", "secret", "token", "short-token"]) {
    assert.throws(() => validateProductionToken(token));
  }
});

test("production accepts a strong admin token", () => {
  assert.doesNotThrow(() =>
    validateProductionToken("8fda957541ed5a52ee565c9d0ea73a885ed48a36652b6f96d9d5551f68722283")
  );
});

test("development may leave the admin API disabled", () => {
  assert.doesNotThrow(() =>
    validateProductionAdminToken({
      nodeEnv: "development",
      adminToken: "",
    })
  );
});
