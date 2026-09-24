import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

const COOKIE_NAME = "sgk_admin_session";
const SESSION_DAYS = 7;

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET is not set");
  }
  return new TextEncoder().encode(secret);
}

export async function verifyCredentials(email: string, password: string) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!adminEmail || !hash) {
    return false;
  }
  if (email.trim().toLowerCase() !== adminEmail.trim().toLowerCase()) {
    return false;
  }
  return bcrypt.compare(password, hash);
}

export async function createSession(email: string) {
  const token = await new SignJWT({ email, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(getSecret());

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as { email: string; role: string };
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }
  return session;
}

export { COOKIE_NAME };
