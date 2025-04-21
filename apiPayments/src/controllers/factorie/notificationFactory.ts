import { EmailNotificationFactory } from "../factories/notification/email.factories";
import { PushNotificationFactory } from "../factories/notification/push.factories";
import { SmsNotificationFactory } from "../factories/notification/sms.factories";
import { WhatsappNotificationFactory } from "../factories/notification/whatsapp.factories";
import { NotificationFactory } from "../NotificationFactory";

export class NotificationProcessorFactory {
  static createProcessor(type: string): NotificationFactory {
    switch (type) {
      case "Email":
        return new EmailNotificationFactory();
      case "SMS":
        return new SmsNotificationFactory();
      case "PUSH":
        return new PushNotificationFactory();
      case "Whatsapp":
        return new WhatsappNotificationFactory();
      default:
        throw new Error("Método de pago no soportado");
    }
  }
}
