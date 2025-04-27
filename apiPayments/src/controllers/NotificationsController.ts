import { Request, Response } from "express";
import { processNotification } from "../services/notifications.service";

export class NotificationsController {
  static createNotification(req: Request, res: Response) {
  // const { type, to, subject, body, from, attachment, phoneNumber, message, deviceToken, mediaUrl, caption, interactiveButtons, language } = req.body;
    try {
      
      const { type } = req.body;
      const notification = {
        // type,
        // to,
        // subject: subject || "",
        // body: body || "",
        // from: from || "",
        // attachment: attachment || "",
        // phoneNumber: phoneNumber || "",
        // message: message || "",
        // deviceToken: deviceToken || "",
        // mediaUrl: mediaUrl || "",
        // caption: caption || "",
        // interactiveButtons: interactiveButtons || [],
        // language: language || ""
      };
      const result = processNotification(type, req.body);

      console.log(req.body);
      
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
