import { Router } from "express";
import { body } from "express-validator";

import { validationResult } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { NotificationsController } from "../controllers/NotificationsController";

const router = Router();

router.post(
  "/",
  body("type")
    .isString()
    .notEmpty()
    .isIn(["Email", "SMS", "PUSH", "Whatsapp"])
    .withMessage("El tipo de Notificacion no es válida"),
  handleInputErrors,
  NotificationsController.createNotification
);

export default router;
