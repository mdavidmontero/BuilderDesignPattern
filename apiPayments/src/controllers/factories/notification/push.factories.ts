import { INotificationProcessor } from "../../../services/notifications";
import { PushProcessor } from "../../methods/notification/PushNotificationProcessor";
import { NotificationFactory } from "../../NotificationFactory";

export class PushNotificationFactory extends NotificationFactory {
  createNotification(): INotificationProcessor {
    return new PushProcessor();
  }
}
