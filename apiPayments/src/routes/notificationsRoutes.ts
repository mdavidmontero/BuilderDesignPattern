import { Router } from "express";
import { body, validationResult } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { NotificationsController } from "../controllers/NotificationsController";
import { validateNotificationFields } from "../middleware/validateNotification.middleware";
import { setDefaultValuesByType } from "../middleware/ValoresPorDefecto";
const router = Router();
router.post(
  "/",
  setDefaultValuesByType,
  body("type")
    .isString()
    .notEmpty()
    .isIn(["Email", "SMS", "PUSH", "Whatsapp"])
    .withMessage("El tipo de notificación no es válido"),
  (req, res, next) => {
    const { type } = req.body;
    const validationFields = validateNotificationFields(type);
    const validationPromises = validationFields.map((validation) => {
      return new Promise<void>((resolve, reject) => {
        validation(req, res, (err: any) => {
          if (err) {
            reject(err.msg || err);
          } else {
            resolve();
          }
        });
      });
    });

    Promise.all(validationPromises)
      .then(() => next())
      .catch((err) => {
        res.status(400).json({ errors: [{ msg: err }] });
      });
  },

  handleInputErrors,

  NotificationsController.createNotification
);

export default router;
