import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


export interface AuthenticatedRequest extends Request {
  user?: {
    email: string;
    id?: string;
  };
}

const protect = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Authorization denied. No token found." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    // Optionally attach decoded user info to req
    if (typeof decoded === "object" && decoded && "email" in decoded) {
      req.user = { email: decoded.email as string };
    }

    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(401).json({ message: "Authorization denied. Invalid or expired token." });
  }
};

export default protect;
