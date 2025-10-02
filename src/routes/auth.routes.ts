import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import { check } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest.middleware";
import { authenticate } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";

const router = Router();


router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Email inválido"),
    check("password").isLength({ min: 6 }).withMessage("Password inválida (min 6 chars)"),
    validateRequest
  ],
  login
);


router.post(
  "/register",
  authenticate,
  requireRole("admin"),
  [
    check("name").notEmpty(),
    check("email").isEmail(),
    check("password").isLength({ min: 6 }),
    validateRequest
  ],
  register
);

export default router;
