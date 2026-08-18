/* Extract PUJA config + i18n from a local copy of live puja.js.
   Strips Supabase credentials. Does not write secrets. */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const srcPath = path.join(process.env.TEMP || "/tmp", "bks-puja.js");
const outPath = path.join(__dirname, "..", "data", "content", "_live-puja-extracted.json");

let src = fs.readFileSync(srcPath, "utf8");
src = src.replace(/const SUPABASE_URL = '.*?';\s*const SUPABASE_ANON_KEY = '.*?';/s, "");
const pujaStart = src.indexOf("const PUJA = {");
const transStart = src.indexOf("const translations = {");
const transEnd = src.indexOf("\nconst LOCALES");
if (pujaStart < 0 || transStart < 0 || transEnd < 0) {
  throw new Error("Could not locate PUJA/translations blocks");
}
const snippet =
  src.slice(pujaStart, transStart) +
  src.slice(transStart, transEnd) +
  "\n;this.PUJA = PUJA; this.translations = translations;";
const sandbox = {};
vm.runInNewContext(snippet, sandbox, { timeout: 1000 });
if (!sandbox.PUJA || !sandbox.translations) {
  throw new Error("Extraction produced empty objects");
}
const payload = {
  note: "Copied from live /puja for local review only. Dates and venue remain ASSUMED. No production database. No payment.",
  source: "https://bks-bangla.vercel.app/puja",
  extractedAt: new Date().toISOString(),
  puja: sandbox.PUJA,
  translations: sandbox.translations
};
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(payload, null, 2));
console.log("wrote", outPath, "bytes", fs.statSync(outPath).size);
