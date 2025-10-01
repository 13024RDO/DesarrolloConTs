import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  if (err?.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({ success: false, message: `${field} duplicado` });
  }

  const status = err?.status || 500;
  const message = err?.message || "Error interno del servidor";
  return res.status(status).json({ success: false, message });
};
