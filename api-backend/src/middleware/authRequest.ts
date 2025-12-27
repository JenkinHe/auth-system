import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserRole } from "../models/entities/enums/user-role.enum";

export interface AuthRequest extends Request {
  user?: string | JwtPayload; // optional, will hold decoded JWT payload
}

export interface AccessTokenPayload {
  sub: string;
  roles: UserRole[];
}

export function verifyAccessToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) return res.status(401).json({ message: "Access token missing" });

  try {
    let payload: AccessTokenPayload;
    payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as AccessTokenPayload;
    req.user = payload; // attach decoded token to request
    next();
  } catch (err) {
    return res.status(403).json({ message: err });
  }
}

export function AdminOnlyPath(req: AuthRequest, res: Response, next: NextFunction) {
  const user = req.user as AccessTokenPayload;
  if (!user?.roles.includes(UserRole.ADMIN))
    return res.status(401).json({ message: "Admins Only" });
  next();
}
