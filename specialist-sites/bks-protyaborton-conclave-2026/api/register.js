"use strict";

var reg = require("./_lib/protyaborton-registration");

var RATE_LIMIT_PER_HOUR = 5;

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

function getClientIp(req) {
  var forwarded = req.headers["x-forwarded-for"];
  if (forwarded) {
    return String(forwarded).split(",")[0].trim();
  }
  return req.socket && req.socket.remoteAddress ? req.socket.remoteAddress : "";
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== "POST") {
    json(res, 405, { ok: false, error: "method_not_allowed" });
    return;
  }

  var body = req.body;
  if (!body || typeof body !== "object") {
    json(res, 400, { ok: false, error: "invalid_payload" });
    return;
  }

  var parsed = reg.sanitizePayload(body);
  if (!parsed.ok) {
    if (parsed.errors.website === "honeypot") {
      json(res, 201, { ok: true });
      return;
    }
    json(res, 400, { ok: false, error: "validation_failed", fields: parsed.errors });
    return;
  }

  var config = reg.getSupabaseConfig();
  if (!config) {
    json(res, 503, { ok: false, error: "configuration_missing" });
    return;
  }

  try {
    var ipHash = reg.hashIp(getClientIp(req));
    var recentCount = await reg.countRecentByIp(config, ipHash);
    if (recentCount >= RATE_LIMIT_PER_HOUR) {
      json(res, 429, { ok: false, error: "rate_limited" });
      return;
    }

    var isDuplicate = await reg.findDuplicate(config, parsed.record);
    if (isDuplicate) {
      json(res, 409, { ok: false, error: "duplicate_registration" });
      return;
    }

    var result = await reg.insertRegistration(config, parsed.record, ipHash);
    if (result.duplicate) {
      json(res, 409, { ok: false, error: "duplicate_registration" });
      return;
    }

    json(res, 201, { ok: true });
  } catch (err) {
    json(res, 500, { ok: false, error: "server_error" });
  }
};
