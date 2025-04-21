import { INotificationProcessor } from "../../../services/notifications";
import { EmailProcessor } from "../../methods/notification/EmailNotificationProcessor";
import { NotificationFactory } from "../../NotificationFactory";

export class EmailNotificationFactory extends NotificationFactory {
    createNotification(): INotificationProcessor {
      return new EmailProcessor();
    }
  }