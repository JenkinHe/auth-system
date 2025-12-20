import jwt, { SignOptions } from "jsonwebtoken";
import crypto from "crypto";
import { jwtConfig } from "../config/jwt.config";

export function generateAccessToken(user: { id: string; roles: string[] }) {
  return jwt.sign(
    {
      sub: user.id,
      roles: user.roles,
    },
    jwtConfig.accessSecret,
    {
      expiresIn: "15m",
    }
  );
}

export function generateRefreshToken(): string {
  return crypto.randomBytes(64).toString("hex");
}

export function hashRefreshToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}
