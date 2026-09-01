"use strict";

var PARTICIPANT_TYPES = {
  agri_digital_creator: true,
  youtuber: true,
  rural_vlogger: true,
  journalist: true,
  media_editor: true,
  other: true
};

var INTEREST_AREAS = {
  jai_kisan_bengal_ratna: true,
  integrated_farming: true,
  women_agri_leaders: true,
  organic_regenerative: true,
  ai_grassroots: true,
  voice_first_ai: true,
  direct_market_access: true,
  predictive_resource_planning: true,
  creator_collaboration: true,
  media_journalism: true,
  podcast_studio: true
};

var CREATOR_TYPES = {
  agri_digital_creator: true,
  youtuber: true,
  rural_vlogger: true
};

var MEDIA_TYPES = {
  journalist: true,
  media_editor: true
};

var MAX = {
  full_name: 120,
  mobile: 20,
  email: 254,
  organisation: 160,
  channel_or_publication: 160,
  district: 80,
  city: 80,
  role_or_designation: 120,
  website_or_social: 500,
  other_participant_type: 80,
  notes: 500
};

function trimStr(value) {
  if (value == null) return "";
  return String(value).trim();
}

function normalizeEmail(email) {
  return trimStr(email).toLowerCase();
}

function normalizeMobile(mobile) {
  var digits = String(mobile || "").replace(/\D/g, "");
  if (digits.length === 12 && digits.indexOf("91") === 0) {
    digits = digits.slice(2);
  }
  if (digits.length === 11 && digits.charAt(0) === "0") {
    digits = digits.slice(1);
  }
  return digits;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= MAX.email;
}

function isValidMobile(mobile) {
  var digits = normalizeMobile(mobile);
  return digits.length === 10 && /^[6-9]\d{9}$/.test(digits);
}

function isValidUrl(url) {
  if (!url) return true;
  try {
    var parsed = new URL(url.indexOf("://") === -1 ? "https://" + url : url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch (err) {
    return false;
  }
}

function sanitizePayload(body) {
  var errors = {};
  var participantType = trimStr(body.participant_type);

  if (!PARTICIPANT_TYPES[participantType]) {
    errors.participant_type = "invalid";
  }

  var fullName = trimStr(body.full_name);
  if (!fullName || fullName.length > MAX.full_name) {
    errors.full_name = "required";
  }

  var email = normalizeEmail(body.email);
  if (!email || !isValidEmail(email)) {
    errors.email = "invalid";
  }

  var mobile = trimStr(body.mobile);
  if (!mobile || !isValidMobile(mobile)) {
    errors.mobile = "invalid";
  }

  var city = trimStr(body.city);
  if (!city || city.length > MAX.city) {
    errors.city = "required";
  }

  if (body.attendance_confirmation !== "yes") {
    errors.attendance_confirmation = "required";
  }

  if (body.consent !== true && body.consent !== "true" && body.consent !== "on") {
    errors.consent = "required";
  }

  if (trimStr(body.website) !== "") {
    errors.website = "honeypot";
  }

  var interests = Array.isArray(body.interest_area) ? body.interest_area : [];
  var cleanInterests = [];
  for (var i = 0; i < interests.length; i += 1) {
    var key = trimStr(interests[i]);
    if (INTEREST_AREAS[key]) cleanInterests.push(key);
  }

  var organisation = trimStr(body.organisation);
  var channel = trimStr(body.channel_or_publication);
  var district = trimStr(body.district);
  var role = trimStr(body.role_or_designation);
  var website = trimStr(body.website_or_social);
  var otherType = trimStr(body.other_participant_type);

  if (organisation.length > MAX.organisation) errors.organisation = "too_long";
  if (channel.length > MAX.channel_or_publication) errors.channel_or_publication = "too_long";
  if (district.length > MAX.district) errors.district = "too_long";
  if (role.length > MAX.role_or_designation) errors.role_or_designation = "too_long";
  if (website.length > MAX.website_or_social) errors.website_or_social = "too_long";
  if (otherType.length > MAX.other_participant_type) errors.other_participant_type = "too_long";

  if (website && !isValidUrl(website)) {
    errors.website_or_social = "invalid";
  }

  if (participantType === "other" && !otherType) {
    errors.other_participant_type = "required";
  }

  if (CREATOR_TYPES[participantType] && !channel) {
    errors.channel_or_publication = "required";
  }

  if (MEDIA_TYPES[participantType] && !organisation) {
    errors.organisation = "required";
  }

  if (Object.keys(errors).length) {
    return { ok: false, errors: errors };
  }

  return {
    ok: true,
    record: {
      full_name: fullName,
      mobile: mobile,
      email: email,
      participant_type: participantType,
      organisation: organisation || null,
      channel_or_publication: channel || null,
      district: district || null,
      city: city,
      role_or_designation: role || null,
      website_or_social: website || null,
      interest_area: cleanInterests,
      attendance_confirmation: "yes",
      consent: true,
      source: "protyaborton-2026-web",
      status: "received",
      other_participant_type: participantType === "other" ? otherType : null
    }
  };
}

function getSupabaseConfig() {
  var url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  var key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return { url: url.replace(/\/$/, ""), key: key };
}

async function findDuplicate(config, record) {
  var email = encodeURIComponent(record.email);
  var mobile = encodeURIComponent(normalizeMobile(record.mobile));
  var query = "or=(email_normalized.eq." + email + ",mobile_normalized.eq." + mobile + ")&select=id&limit=1";
  var response = await fetch(config.url + "/rest/v1/protyaborton_registrations?" + query, {
    method: "GET",
    headers: {
      apikey: config.key,
      Authorization: "Bearer " + config.key
    }
  });
  if (!response.ok) {
    throw new Error("duplicate_check_failed");
  }
  var rows = await response.json();
  return Array.isArray(rows) && rows.length > 0;
}

async function countRecentByIp(config, ipHash) {
  if (!ipHash) return 0;
  var since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  var query = "submitter_ip_hash=eq." + encodeURIComponent(ipHash)
    + "&created_at=gte." + encodeURIComponent(since)
    + "&select=id";
  var response = await fetch(config.url + "/rest/v1/protyaborton_registrations?" + query, {
    method: "GET",
    headers: {
      apikey: config.key,
      Authorization: "Bearer " + config.key
    }
  });
  if (!response.ok) return 0;
  var rows = await response.json();
  return Array.isArray(rows) ? rows.length : 0;
}

async function insertRegistration(config, record, ipHash) {
  var payload = Object.assign({}, record, {
    submitter_ip_hash: ipHash || null
  });
  var response = await fetch(config.url + "/rest/v1/protyaborton_registrations", {
    method: "POST",
    headers: {
      apikey: config.key,
      Authorization: "Bearer " + config.key,
      "Content-Type": "application/json",
      Prefer: "return=minimal"
    },
    body: JSON.stringify(payload)
  });

  if (response.status === 409) {
    return { duplicate: true };
  }

  if (!response.ok) {
    var text = await response.text();
    if (text.indexOf("protyaborton_registrations_email_unique") !== -1
      || text.indexOf("protyaborton_registrations_mobile_unique") !== -1) {
      return { duplicate: true };
    }
    throw new Error("insert_failed");
  }

  return { ok: true };
}

function hashIp(ip) {
  if (!ip) return null;
  var crypto = require("crypto");
  return crypto.createHash("sha256").update(ip + (process.env.REGISTRATION_IP_SALT || "protyaborton-2026")).digest("hex");
}

module.exports = {
  PARTICIPANT_TYPES: PARTICIPANT_TYPES,
  INTEREST_AREAS: INTEREST_AREAS,
  sanitizePayload: sanitizePayload,
  getSupabaseConfig: getSupabaseConfig,
  findDuplicate: findDuplicate,
  countRecentByIp: countRecentByIp,
  insertRegistration: insertRegistration,
  hashIp: hashIp
};
