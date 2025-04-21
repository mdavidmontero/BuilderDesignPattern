import { Request, Response } from "express";
import { processNotification } from "../services/notifications.service";

export class NotificationsController {
  static createNotification(req: Request, res: Response) {
    try {
      const { type } = req.body;
      const result = processNotification(type, req.body);

      res.json({
        message: "Notificación enviada correctamente",
        success: true,
        FinalMessage: result,
      });
    } catch (error: any) {
      res.status(400).json({
        message: "Error al enviar la notificación",
        success: false,
        error: error.message,
      });
    }
  }
}
