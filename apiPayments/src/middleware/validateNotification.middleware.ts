import { body, validationResult } from "express-validator";

const filterInvalidFields = (req: any, type: string) => {
  const allowedFields: string[] = [];

  if (type === "Email") {
    allowedFields.push(
      "type",
      "to",
      "subject",
      "body",
      "cc",
      "bcc",
      "attachments",
      "priority"
    );
  } else if (type === "SMS") {
    allowedFields.push(
      "type",
      "phoneNumber",
      "message",
      "senderId",
      "deliveryReportRequired",
      "scheduleTime"
    );
  } else if (type === "PUSH") {
    allowedFields.push(
      "type",
      "deviceToken",
      "title",
      "message",
      "imageUrl",
      "clickAction",
      "priority"
    );
  } else if (type === "Whatsapp") {
    allowedFields.push(
      "type",
      "phoneNumber",
      "message",
      "mediaUrl",
      "caption",
      "interactiveButtons",
      "language"
    );
  }

  const invalidFields = Object.keys(req.body).filter(
    (key) => !allowedFields.includes(key)
  );

  if (invalidFields.length > 0) {
    return `Los campos no permitidos son: ${invalidFields.join(", ")}`;
  }

  return null;
};

export const validateNotificationFields = (type: string) => {
  return [
    (req, res, next) => {
      const invalidFieldsMessage = filterInvalidFields(req, type);
      if (invalidFieldsMessage) {
        return res.status(400).json({
          errors: [{ msg: invalidFieldsMessage }],
        });
      }
      next();
    },

    body("type")
      .isString()
      .notEmpty()
      .isIn(["Email", "SMS", "PUSH", "Whatsapp"])
      .withMessage("El tipo de notificación no es válido"),

    ...(type === "Email"
      ? [
          body("to")
            .isEmail()
            .withMessage("El campo 'to' debe ser un correo electrónico válido")
            .notEmpty()
            .withMessage("El campo 'to' debe ser un correo electrónico válido"),
          body("subject")
            .optional()
            .isString()
            .notEmpty()
            .withMessage(
              "El campo 'subject' debe ser una cadena de texto válida si se proporciona."
            ),
          body("body")
            .optional()
            .isString()
            .notEmpty()
            .withMessage(
              "El campo 'body' debe ser una cadena de texto válida si se proporciona."
            ),
          body("cc")
            .optional()
            .isArray()
            .notEmpty()
            .withMessage(
              "El campo 'cc' debe ser un arreglo de cadenas de texto si se proporciona."
            ),
          body("bcc")
            .optional()
            .isArray()
            .notEmpty()
            .withMessage(
              "El campo 'bcc' debe ser un arreglo de cadenas de texto si se proporciona."
            ),
          body("attachments")
            .optional()
            .isArray()
            .notEmpty()
            .withMessage(
              "El campo 'attachments' debe ser un arreglo si se proporciona."
            ),
          body("priority")
            .optional()
            .notEmpty()
            .isIn(["alta", "media", "baja"])
            .withMessage(
              "El campo 'priority' debe ser uno de los valores permitidos ('alta', 'media', 'baja')"
            ),
        ]
      : []),

    ...(type === "SMS"
      ? [
          body("phoneNumber")
            .isMobilePhone("any")
            .notEmpty()
            .withMessage(
              "El campo 'phoneNumber' debe ser un número de teléfono válido"
            ),
          body("message")
            .isString()
            .notEmpty()
            .withMessage("El campo 'message' debe ser una cadena de texto"),
          body("senderId")
            .optional()
            .isString()
            .notEmpty()
            .withMessage(
              "El campo 'senderId' debe ser una cadena de texto si se proporciona."
            ),
          body("deliveryReportRequired")
            .optional()
            .isBoolean()
            .notEmpty()
            .withMessage(
              "El campo 'deliveryReportRequired' debe ser un valor booleano"
            ),
          body("scheduleTime")
            .optional()
            .isISO8601()
            .notEmpty()
            .withMessage(
              "El campo 'scheduleTime' debe ser una fecha válida en formato ISO 8601"
            ),
        ]
      : []),

    ...(type === "PUSH"
      ? [
          body("deviceToken")
            .isString()
            .notEmpty()
            .withMessage("El campo 'deviceToken' debe ser una cadena de texto"),
          body("message")
            .isString()
            .notEmpty()
            .withMessage("El campo 'message' debe ser una cadena de texto"),
          body("title")
            .optional()
            .isString()
            .notEmpty()
            .withMessage(
              "El campo 'title' debe ser una cadena de texto si se proporciona."
            ),
          body("imageUrl")
            .optional()
            .isString()
            .notEmpty()
            .withMessage(
              "El campo 'imageUrl' debe ser una cadena de texto si se proporciona."
            ),
          body("clickAction")
            .optional()
            .notEmpty()
            .isString()
            .withMessage(
              "El campo 'clickAction' debe ser una cadena de texto si se proporciona."
            ),
          body("priority")
            .optional()
            .notEmpty()
            .isIn(["urgente", "normal"])
            .withMessage("El campo 'priority' debe ser 'urgente' o 'normal'"),
        ]
      : []),

    ...(type === "Whatsapp"
      ? [
          body("phoneNumber")
            .isMobilePhone("any")
            .notEmpty()
            .withMessage(
              "El campo 'phoneNumber' debe ser un número de teléfono válido"
            ),
          body("message")
            .isString()
            .notEmpty()
            .withMessage("El campo 'message' debe ser una cadena de texto"),
          body("mediaUrl")
            .optional()
            .isString()
            .notEmpty()
            .withMessage(
              "El campo 'mediaUrl' debe ser una cadena de texto si se proporciona."
            ),
          body("caption")
            .optional()
            .isString()
            .notEmpty()
            .withMessage(
              "El campo 'caption' debe ser una cadena de texto si se proporciona."
            ),
          body("interactiveButtons")
            .optional()
            .notEmpty()
            .isArray()
            .withMessage(
              "El campo 'interactiveButtons' debe ser un arreglo si se proporciona."
            ),
          body("language")
            .optional()
            .isString()
            .notEmpty()
            .withMessage(
              "El campo 'language' debe ser una cadena de texto si se proporciona."
            ),
        ]
      : []),
  ];
};

export const handleInputErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
