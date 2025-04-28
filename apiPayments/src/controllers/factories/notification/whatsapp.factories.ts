import { INotificationProcessor } from "../../../services/notifications";
import { WhatsappProcessor } from "../../methods/notification/WhatsappNotificationProcessor";

import { NotificationFactory } from "../../NotificationFactory";

export class WhatsappNotificationFactory extends NotificationFactory {
  createNotification(): INotificationProcessor {
    return new WhatsappProcessor();
  }
}
