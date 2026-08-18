import { jwtVerify, SignJWT } from "jose";
import { cookies, headers } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "secret";
const key = new TextEncoder().encode(JWT_SECRET);
export type SessionPayload = {
  id: string;
  email: string;
  role: "ADMIN" | "MEMBER";
};

export async function signToken(payload: SessionPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(key);
}

export async function verifyToken(
  token: string,
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });
    return payload as SessionPayload;
  } catch (error) {
    return null;
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const headersList = await headers();
  const sessionHeader = headersList.get("x-user-session");

  if (sessionHeader) {
    try {
      return JSON.parse(sessionHeader) as SessionPayload;
    } catch {
      return null;
    }
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("kanban_session")?.value;
  if (!token) return null;
  return await verifyToken(token);
}

export async function requireAuth(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function requireAdmin(): Promise<SessionPayload> {
  const session = await requireAuth();
  if (session.role !== "ADMIN") {
    throw new Error("Forbidden: Admin access required");
  }
  return session;
}
