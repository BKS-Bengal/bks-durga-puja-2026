/**
 * Protyaborton registration API integration tests.
 * Loads credentials from bks-west-bengal-people-mobilization/.env.local (not committed).
 * Run: node scripts/test-registration-api.mjs
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const handler = require("../api/register.js");
const reg = require("../api/_lib/protyaborton-registration.js");

const ENV_PATH = resolve(
  __dirname,
  "../../../../bks-west-bengal-people-mobilization/.env.local"
);

function loadEnv(path) {
  const text = readFileSync(path, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
}

function mockRes() {
  const res = {
    statusCode: 0,
    headers: {},
    body: "",
    setHeader(k, v) {
      this.headers[k] = v;
    },
    end(b) {
      this.body = b;
    },
  };
  return res;
}

async function call(body, ip) {
  const res = mockRes();
  await handler(
    {
      method: "POST",
      headers: ip ? { "x-forwarded-for": ip } : {},
      body,
    },
    res
  );
  let data = {};
  try {
    data = JSON.parse(res.body || "{}");
  } catch {
    data = {};
  }
  return { status: res.statusCode, data };
}

function base(overrides) {
  return Object.assign(
    {
      full_name: "Protyaborton Test User",
      mobile: "9876543210",
      email: "protyaborton.test@example.com",
      participant_type: "journalist",
      city: "Kolkata",
      organisation: "Test Daily",
      attendance_confirmation: "yes",
      consent: true,
      interest_area: ["media_journalism"],
    },
    overrides
  );
}

const results = [];
function record(name, pass, detail) {
  results.push({ name, pass, detail });
  console.log(`${pass ? "PASS" : "FAIL"} ${name}${detail ? ` — ${detail}` : ""}`);
}

async function main() {
  try {
    loadEnv(ENV_PATH);
  } catch (err) {
    console.error("Could not load env from mobilization project:", err.message);
    process.exit(1);
  }

  if (!reg.getSupabaseConfig()) {
    console.error("Supabase config missing after env load.");
    process.exit(1);
  }

  const testEmail = `protyaborton.qa.${Date.now()}@example.com`;
  const testMobile = `98${String(Date.now()).slice(-8)}`;

  let r;

  r = await call(base({ email: testEmail, mobile: testMobile }));
  record("valid journalist", r.status === 201 && r.data.ok, `status ${r.status}`);

  r = await call(
    base({
      email: `creator.${testEmail}`,
      mobile: `97${String(Date.now()).slice(-8)}`,
      participant_type: "youtuber",
      channel_or_publication: "Farm Tube WB",
      organisation: "",
    })
  );
  record("valid creator", r.status === 201 && r.data.ok, `status ${r.status}`);

  r = await call(
    base({
      email: `editor.${testEmail}`,
      mobile: `96${String(Date.now()).slice(-8)}`,
      participant_type: "media_editor",
      organisation: "Agri Times",
      role_or_designation: "Editor",
    })
  );
  record("valid media editor", r.status === 201 && r.data.ok, `status ${r.status}`);

  r = await call(
    base({
      email: `other.${testEmail}`,
      mobile: `95${String(Date.now()).slice(-8)}`,
      participant_type: "other",
      other_participant_type: "Podcast host",
      organisation: "",
    })
  );
  record("other participant", r.status === 201 && r.data.ok, `status ${r.status}`);

  r = await call(base({ full_name: "", email: testEmail, mobile: testMobile }));
  record("missing required field", r.status === 400, `status ${r.status}`);

  r = await call(base({ email: "not-an-email", mobile: testMobile }));
  record("invalid email", r.status === 400, `status ${r.status}`);

  r = await call(base({ email: testEmail, mobile: "12345" }));
  record("invalid mobile", r.status === 400, `status ${r.status}`);

  r = await call(base({ email: testEmail, mobile: testMobile, consent: false }));
  record("missing consent", r.status === 400, `status ${r.status}`);

  r = await call(base({ email: testEmail, mobile: testMobile }));
  record("duplicate email/mobile", r.status === 409, `status ${r.status}`);

  r = await call(
    base({
      email: `hp.${testEmail}`,
      mobile: `94${String(Date.now()).slice(-8)}`,
      website: "http://spam.example",
    })
  );
  record("honeypot silent success", r.status === 201 && r.data.ok, `status ${r.status}`);

  const config = reg.getSupabaseConfig();
  const dupCheck = await fetch(
    `${config.url}/rest/v1/protyaborton_registrations?email_normalized=eq.${encodeURIComponent(testEmail.toLowerCase())}&select=id`,
    {
      headers: {
        apikey: config.key,
        Authorization: `Bearer ${config.key}`,
      },
    }
  );
  const dupRows = await dupCheck.json();
  record(
    "honeypot did not insert",
    !Array.isArray(dupRows) || dupRows.length === 0,
    `rows ${Array.isArray(dupRows) ? dupRows.length : "n/a"}`
  );

  const prevUrl = process.env.SUPABASE_URL;
  const prevKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  delete process.env.SUPABASE_URL;
  delete process.env.NEXT_PUBLIC_SUPABASE_URL;
  delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  r = await call(base({ email: "x@y.com", mobile: "9876543211" }));
  process.env.SUPABASE_URL = prevUrl;
  process.env.SUPABASE_SERVICE_ROLE_KEY = prevKey;
  record("missing configuration", r.status === 503, `status ${r.status}`);

  const failed = results.filter((x) => !x.pass).length;
  console.log(`\n${results.length - failed}/${results.length} passed`);
  process.exit(failed ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
