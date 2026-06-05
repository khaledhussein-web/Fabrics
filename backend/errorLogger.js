const pool = require("./db");

const MAX_METHOD_LENGTH = 10;
const MAX_PATH_LENGTH = 500;
const MAX_MESSAGE_LENGTH = 500;
const RETENTION_DAYS = 30;
const CLEANUP_INTERVAL_MS = 6 * 60 * 60 * 1000;

let tableReady;
let lastCleanupAt = 0;

const truncate = (value, maxLength) =>
  String(value ?? "").replace(/[\r\n\t]+/g, " ").slice(0, maxLength);

const ensureErrorLogTable = () => {
  if (!tableReady) {
    tableReady = pool
      .query(`
        CREATE TABLE IF NOT EXISTS api_error_logs (
          id BIGSERIAL PRIMARY KEY,
          request_id VARCHAR(64) NOT NULL,
          error_code INTEGER NOT NULL,
          http_status SMALLINT NOT NULL,
          method VARCHAR(10) NOT NULL,
          request_path VARCHAR(500) NOT NULL,
          public_message VARCHAR(500) NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `)
      .then(() =>
        pool.query(`
          CREATE INDEX IF NOT EXISTS api_error_logs_created_at_idx
          ON api_error_logs (created_at DESC)
        `)
      )
      .catch((error) => {
        tableReady = null;
        throw error;
      });
  }

  return tableReady;
};

const cleanupExpiredLogs = async () => {
  const now = Date.now();
  if (now - lastCleanupAt < CLEANUP_INTERVAL_MS) return;

  lastCleanupAt = now;
  await pool.query(
    `DELETE FROM api_error_logs
     WHERE created_at < NOW() - ($1 * INTERVAL '1 day')`,
    [RETENTION_DAYS]
  );
};

const logApiError = async ({
  requestId,
  errorCode,
  httpStatus,
  method,
  requestPath,
  publicMessage,
}) => {
  try {
    await ensureErrorLogTable();
    await pool.query(
      `INSERT INTO api_error_logs
        (request_id, error_code, http_status, method, request_path, public_message)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        truncate(requestId, 64),
        errorCode,
        httpStatus,
        truncate(method || "UNKNOWN", MAX_METHOD_LENGTH),
        truncate(requestPath || "/", MAX_PATH_LENGTH),
        truncate(publicMessage, MAX_MESSAGE_LENGTH),
      ]
    );
    await cleanupExpiredLogs();
  } catch (error) {
    console.error("Unable to persist API error log:", error);
  }
};

module.exports = {
  ensureErrorLogTable,
  logApiError,
};
