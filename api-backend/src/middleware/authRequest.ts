import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: unknown; // optional, will hold decoded JWT payload
}

export function verifyAccessToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) return res.status(401).json({ message: "Access token missing" });

  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
    req.user = payload; // attach decoded token to request
    next();
  } catch (err) {
    return res.status(403).json({ message: err });
  }
}
