import { Request, Response, NextFunction } from "express";

export const requireRole = (role: "admin" | "user") => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ success: false, message: "No autorizado" });
    if (req.user.role !== role && req.user.role !== "admin") {
    
      if (role === "admin") return res.status(403).json({ success: false, message: "Se requiere rol admin" });
    }
    next();
  };
};
