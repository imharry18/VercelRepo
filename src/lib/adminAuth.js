import crypto from "crypto";

const SESSION_COOKIE = "admin_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || "";
}

function sign(payload) {
  const secret = getSecret();
  if (!secret) return null;

  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto.createHmac("sha256", secret).update(data).digest("base64url");

  return `${data}.${signature}`;
}

function verify(token) {
  const secret = getSecret();
  if (!secret) return null;

  const [data, signature] = token.split(".");
  if (!data || !signature) return null;

  const expected = crypto.createHmac("sha256", secret).update(data).digest("base64url");
  if (signature.length !== expected.length) return null;
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;

  try {
    const payload = JSON.parse(Buffer.from(data, "base64url").toString("utf8"));
    if (!payload.exp || Date.now() > payload.exp) return null;
    return payload;
  } catch (error) {
    return null;
  }
}

export function createAdminSessionToken() {
  const payload = {
    iat: Date.now(),
    exp: Date.now() + SESSION_TTL_MS
  };

  return sign(payload);
}

export function getAdminSessionCookieName() {
  return SESSION_COOKIE;
}

export function isAdminRequest(request) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return false;

  return Boolean(verify(token));
}
