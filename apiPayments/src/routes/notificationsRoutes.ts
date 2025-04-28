import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { handleInputErrors } from '../middleware/validation';
import { NotificationsController } from '../controllers/NotificationsController';
import { validateNotificationFields } from '../middleware/validateNotification.middleware';
import { setDefaultValuesByType } from '../middleware/ValoresPorDefecto';

const router = Router();

// Ruta para crear una notificación
router.post(
  '/',
  // Middleware para establecer los valores por defecto según el tipo de notificación
  setDefaultValuesByType,

  // Validación de tipo de notificación
  body('type')
    .isString()
    .notEmpty()
    .isIn(['Email', 'SMS', 'PUSH', 'Whatsapp'])
    .withMessage('El tipo de notificación no es válido'),

  // Middleware para validar los campos según el tipo
  (req, res, next) => {
    const { type } = req.body;
    
    const validationFields = validateNotificationFields(type);

    // Ejecutar todas las validaciones
    const validationPromises = validationFields.map(validation => {
      return new Promise<void>((resolve, reject) => {
        validation(req, res, (err: any) => {
          if (err) {
            reject(err.msg || err);  // Asegúrate de devolver el mensaje del error
          } else {
            resolve();
          }
        });
      });
    });
    

    Promise.all(validationPromises)
      .then(() => next())  // Si todas las validaciones pasan
      .catch((err) => {  // Si alguna validación falla
        res.status(400).json({ errors: [{ msg: err }] });
      });
  },

  // Manejo de errores de validación
  handleInputErrors,

  // Controlador para crear la notificación
  NotificationsController.createNotification
);

export default router;
