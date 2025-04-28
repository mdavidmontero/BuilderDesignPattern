import { Request, Response } from "express";
import { processNotification } from "../services/notifications.service";
import { EmailSms } from "../emails/emailService";

export class NotificationsController {
  static async createNotification(req: Request, res: Response) {
    try {
      const { type, from, to, subject, body } = req.body;
      if (type === "Email") {
        await EmailSms.sendConfirmationEmail({
          from: from,
          email: to,
          subject: subject,
          body: body,
        });
      }
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
