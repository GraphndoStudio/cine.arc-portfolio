import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { AdminUser, readDatabase } from "./data-store";

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || "cine_arc_super_secret_jwt_key_change_in_production_2026";
export const AUTH_COOKIE_NAME = "cinearc_admin_session";

export interface SessionPayload {
  userId: string;
  email: string;
  role: string;
  name: string;
}

export function signAdminToken(user: AdminUser): string {
  const payload: SessionPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyAdminToken(token: string): SessionPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as SessionPayload;
  } catch {
    return null;
  }
}

export async function getCurrentAdmin(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;

  const payload = verifyAdminToken(token);
  if (!payload) return null;

  // Verify user still exists in database
  const db = readDatabase();
  const exists = db.users.find((u) => u.id === payload.userId);
  if (!exists) return null;

  return payload;
}
