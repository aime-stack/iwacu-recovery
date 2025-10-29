import jwt from "jsonwebtoken";

// In production, JWT_SECRET must be provided. In dev, fall back to a local default.
const SECRET =
  process.env.JWT_SECRET ||
  (process.env.NODE_ENV === "production"
    ? (() => {
        throw new Error("JWT_SECRET is required in production.");
      })()
    : "dev_only_insecure_secret_change_me");

export function signToken(payload: { email: string }) {
  return jwt.sign(payload, SECRET, { expiresIn: "1d" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET) as { email: string };
  } catch {
    return null;
  }
}

