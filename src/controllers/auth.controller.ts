import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = await authService.registerUser(req.body);
    return res.status(201).json({ success: true, data: { id: newUser._id, email: newUser.email, name: newUser.name, role: newUser.role } });
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    return res.status(200).json({ success: true, data: { user: { id: result.user._id, email: result.user.email, role: result.user.role }, token: result.token } });
  } catch (err) {
    next(err);
  }
};
