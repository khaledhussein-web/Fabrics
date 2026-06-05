const fs = require("node:fs");
const fsp = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");
const dns = require("node:dns/promises");
const http = require("node:http");
const https = require("node:https");
const net = require("node:net");
const { createRequire } = require("node:module");

const repoRoot = path.resolve(__dirname, "..");
const backendDir = path.join(repoRoot, "backend");
const backendRequire = createRequire(path.join(backendDir, "package.json"));
const dotenv = backendRequire("dotenv");
const { Pool } = backendRequire("pg");

dotenv.config({ path: path.join(repoRoot, ".env") });
dotenv.config({ path: path.join(backendDir, ".env"), override: true });

const args = new Set(process.argv.slice(2));
const apply = args.has("--apply");
const verbose = args.has("--verbose");
const maxBytes = Number(process.env.IMAGE_LOCALIZE_MAX_BYTES || 20 * 1024 * 1024);

const CATEGORY_UPLOAD_FOLDERS = {
  1: "Fabrics",
  2: "Flooring",
  3: "Frames",
  4: "Tracks",
  5: "ProjectionScreens",
  6: "Trussing",
};

const CONTENT_TYPE_EXTENSIONS = {
  "image/jpeg": ".jpg",
  "image/jpg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/avif": ".avif",
};

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD ?? process.env.DB_PASS ?? ""),
});

const isExternalUrl = (value) => /^https?:\/\//i.test(String(value || "").trim());
const cleanStoredPath = (value) => String(value || "").trim().replace(/^["']|["']$/g, "");

const isPublicAddress = (address) => {
  const version = net.isIP(address);
  if (version === 4) {
    const octets = address.split(".").map(Number);
    const [a, b] = octets;
    return !(
      a === 0 ||
      a === 10 ||
      a === 127 ||
      (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 0) ||
      (a === 192 && b === 2) ||
      (a === 192 && b === 168) ||
      (a === 198 && (b === 18 || b === 19 || b === 51)) ||
      (a === 203 && b === 0) ||
      a >= 224
    );
  }

  if (version === 6) {
    const normalized = address.toLowerCase();
    if (normalized.startsWith("::ffff:")) {
      return isPublicAddress(normalized.slice(7));
    }
    return !(
      normalized === "::" ||
      normalized === "::1" ||
      normalized.startsWith("fc") ||
      normalized.startsWith("fd") ||
      /^fe[89ab]/.test(normalized) ||
      normalized.startsWith("2001:db8:") ||
      normalized.startsWith("ff")
    );
  }

  return false;
};

const resolvePublicAddress = async (hostname) => {
  const results = await dns.lookup(hostname, { all: true, verbatim: true });
  const publicResult = results.find(({ address }) => isPublicAddress(address));
  if (!publicResult || results.some(({ address }) => !isPublicAddress(address))) {
    throw new Error(`Refusing non-public image host: ${hostname}`);
  }
  return publicResult;
};

const slugify = (value) =>
  String(value || "image")
    .normalize("NFKD")
    .replace(/[^\w\s.-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80)
    .replace(/^-|-$/g, "")
    .toLowerCase() || "image";

const extensionFrom = (url, contentType) => {
  const headerType = String(contentType || "").split(";")[0].trim().toLowerCase();
  if (CONTENT_TYPE_EXTENSIONS[headerType]) return CONTENT_TYPE_EXTENSIONS[headerType];

  try {
    const ext = path.extname(new URL(url).pathname).toLowerCase();
    if ([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"].includes(ext)) {
      return ext === ".jpeg" ? ".jpg" : ext;
    }
  } catch {
    // Fall through to the default extension.
  }

  return ".jpg";
};

const requestBuffer = async (url, redirectCount = 0) => {
  if (redirectCount > 5) {
    throw new Error("Too many redirects");
  }

  const parsedUrl = new URL(url);
  if (!["http:", "https:"].includes(parsedUrl.protocol)) {
    throw new Error(`Unsupported image URL protocol: ${parsedUrl.protocol}`);
  }

  const resolved = await resolvePublicAddress(parsedUrl.hostname);

  return new Promise((resolve, reject) => {
    const client = parsedUrl.protocol === "https:" ? https : http;
    const request = client.get(
      parsedUrl,
      {
        headers: {
          "User-Agent": "StageWare image localizer/1.0",
        },
        family: resolved.family,
        timeout: 30000,
        lookup(hostname, options, callback) {
          callback(null, resolved.address, resolved.family);
        },
      },
      (response) => {
        const status = response.statusCode || 0;
        const location = response.headers.location;

        if ([301, 302, 303, 307, 308].includes(status) && location) {
          response.resume();
          resolve(requestBuffer(new URL(location, parsedUrl).toString(), redirectCount + 1));
          return;
        }

        if (status < 200 || status >= 300) {
          response.resume();
          reject(new Error(`HTTP ${status}`));
          return;
        }

        const contentType = String(response.headers["content-type"] || "");
        if (!contentType.toLowerCase().startsWith("image/")) {
          response.resume();
          reject(new Error(`Expected image response, got "${contentType || "unknown"}"`));
          return;
        }

        const chunks = [];
        let total = 0;

        response.on("data", (chunk) => {
          total += chunk.length;
          if (total > maxBytes) {
            request.destroy(new Error(`Image exceeds ${maxBytes} bytes`));
            return;
          }
          chunks.push(chunk);
        });

        response.on("end", () => {
          resolve({
            buffer: Buffer.concat(chunks),
            contentType,
          });
        });
      }
    );

    request.on("timeout", () => request.destroy(new Error("Request timed out")));
    request.on("error", reject);
  });
};

const ensureTracksSpecsExists = async () => {
  const { rows } = await pool.query("SELECT to_regclass('public.tracks_specs') AS table_name");
  return Boolean(rows[0]?.table_name);
};

const getAllImageRows = async () => {
  const productRows = await pool.query(`
    SELECT
      'products' AS source_table,
      product_id,
      NULL::integer AS photo_id,
      category_id,
      name_en,
      image_path AS source_url
    FROM public.products
    WHERE image_path IS NOT NULL AND btrim(image_path) <> ''
    ORDER BY product_id
  `);

  const rows = productRows.rows;

  if (await ensureTracksSpecsExists()) {
    const trackPhotoRows = await pool.query(`
      SELECT
        'tracks_specs' AS source_table,
        p.product_id,
        ts.photo_id,
        p.category_id,
        COALESCE(ts.alt_text, p.name_en) AS name_en,
        ts.photo_url AS source_url
      FROM public.tracks_specs ts
      JOIN public.products p ON p.product_id = ts.product_id
      WHERE ts.photo_url IS NOT NULL AND btrim(ts.photo_url) <> ''
      ORDER BY p.product_id, ts.photo_id
    `);
    rows.push(...trackPhotoRows.rows);
  }

  return rows;
};

const getExternalImageRows = async () => {
  const rows = await getAllImageRows();
  return rows.filter((row) => isExternalUrl(cleanStoredPath(row.source_url)));
};

const stripQueryAndHash = (value) => String(value || "").split(/[?#]/)[0];

const localFilePathForStoredPath = (row) => {
  const value = stripQueryAndHash(cleanStoredPath(row.source_url)).replace(/\\/g, "/");
  if (!value || isExternalUrl(value)) return null;

  if (value.startsWith("/uploads/")) {
    return path.join(backendDir, value.slice(1));
  }

  if (value.startsWith("uploads/")) {
    return path.join(backendDir, value);
  }

  if (!value.includes("/")) {
    const folder = CATEGORY_UPLOAD_FOLDERS[Number(row.category_id)];
    if (folder) {
      return path.join(backendDir, "uploads", folder, value);
    }
  }

  return path.join(backendDir, "uploads", value);
};

const auditMissingLocalFiles = async () => {
  const rows = await getAllImageRows();
  const localRows = rows
    .map((row) => ({
      ...row,
      cleanedPath: cleanStoredPath(row.source_url),
      filePath: localFilePathForStoredPath(row),
    }))
    .filter((row) => row.filePath);

  const missing = [];

  for (const row of localRows) {
    if (!fs.existsSync(row.filePath)) {
      missing.push(row);
    }
  }

  console.log(`Checked ${localRows.length} local image reference(s).`);
  console.log(`Missing local file(s): ${missing.length}.`);

  for (const row of missing) {
    console.log(`[missing] ${row.source_table} product=${row.product_id}${row.photo_id ? ` photo=${row.photo_id}` : ""}: ${row.cleanedPath}`);
  }
};

const localPathForRow = async (row, url, contentType) => {
  const folder = CATEGORY_UPLOAD_FOLDERS[Number(row.category_id)] || "Products";
  const uploadsDir = path.join(backendDir, "uploads", folder);
  await fsp.mkdir(uploadsDir, { recursive: true });

  const hash = crypto.createHash("sha1").update(url).digest("hex").slice(0, 10);
  const label = row.source_table === "tracks_specs"
    ? `track-${row.product_id}-photo-${row.photo_id}`
    : `product-${row.product_id}-${slugify(row.name_en)}`;
  const ext = extensionFrom(url, contentType);
  const filename = `${label}-${hash}${ext}`;

  return {
    absolutePath: path.join(uploadsDir, filename),
    dbPath: `/uploads/${folder}/${filename}`,
  };
};

const updateDatabasePath = async (client, row, dbPath) => {
  if (row.source_table === "tracks_specs") {
    await client.query(
      "UPDATE public.tracks_specs SET photo_url = $1 WHERE photo_id = $2",
      [dbPath, row.photo_id]
    );
    return;
  }

  await client.query(
    "UPDATE public.products SET image_path = $1 WHERE product_id = $2",
    [dbPath, row.product_id]
  );
};

const main = async () => {
  if (!process.env.DB_PASSWORD && !process.env.DB_PASS) {
    throw new Error("Missing DB_PASSWORD or DB_PASS in backend/.env.");
  }

  const rows = await getExternalImageRows();
  console.log(`Found ${rows.length} external image reference(s).`);
  await auditMissingLocalFiles();

  if (rows.length === 0) {
    return;
  }

  if (!apply) {
    console.log("Dry run only. Re-run with --apply to download files and update database rows.");
    for (const row of rows) {
      console.log(`[dry-run] ${row.source_table} product=${row.product_id}${row.photo_id ? ` photo=${row.photo_id}` : ""}: ${row.source_url}`);
    }
    return;
  }

  const client = await pool.connect();
  const failures = [];

  try {
    for (const row of rows) {
      try {
        console.log(`Downloading ${row.source_url}`);
        const { buffer, contentType } = await requestBuffer(row.source_url);
        const { absolutePath, dbPath } = await localPathForRow(row, row.source_url, contentType);

        if (!fs.existsSync(absolutePath)) {
          await fsp.writeFile(absolutePath, buffer);
        } else if (verbose) {
          console.log(`File already exists: ${absolutePath}`);
        }

        await updateDatabasePath(client, row, dbPath);
        console.log(`Updated ${row.source_table}: ${dbPath}`);
      } catch (error) {
        failures.push({ row, error });
        console.error(`Failed ${row.source_table} product=${row.product_id}: ${error.message}`);
      }
    }
  } finally {
    client.release();
  }

  if (failures.length > 0) {
    console.error(`Finished with ${failures.length} failure(s).`);
    process.exitCode = 1;
    return;
  }

  console.log("All external images were localized successfully.");
};

main()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end().catch(() => {});
  });
