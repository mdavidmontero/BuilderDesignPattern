import { INotificationProcessor } from "../../../services/notifications";
import { SmsProcessor } from "../../methods/notification/SMSNotificationProcessor";
import { NotificationFactory } from "../../NotificationFactory";

export class SmsNotificationFactory extends NotificationFactory {
  createNotification(): INotificationProcessor {
    return new SmsProcessor();
  }
}
