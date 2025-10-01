import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";
import * as controller from "../controllers/equipment.controller";
import { check } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest.middleware";

const router = Router();


router.use(authenticate);

 * GET /api/equipment
 * admin -> all ; user -> solo asignados
 */
router.get("/", controller.list);


router.post(
  "/",
  requireRole("admin"),
  [
    check("serialNumber").notEmpty().withMessage("serialNumber requerido"),
    check("type").notEmpty().withMessage("type requerido"),
    validateRequest
  ],
  controller.create
);


router.get("/:id", controller.getOne);


router.put("/:id", requireRole("user"), controller.update);


router.delete("/:id", requireRole("admin"), controller.remove);

export default router;
