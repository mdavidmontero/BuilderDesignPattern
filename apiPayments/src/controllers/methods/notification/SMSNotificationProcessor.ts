import { NotificationDirector } from "../../../builders/directors/NotificationDirector";
import { SmsBuilder } from "../../../builders/Concrete Builder/SmsBuilder";
import { SmsNotification } from "../../../builders/Productos/SmsNotification";
import { INotificationProcessor } from "../../../services/notifications";
import { ISmsBuilder } from "../../../builders/Builder/ISmsBuilder";

export class SmsProcessor implements INotificationProcessor {
  process(message: any): string {
    const builder = new SmsBuilder();
    const director = new NotificationDirector<SmsNotification, ISmsBuilder>();
    director.setBuilder(builder);

    const sms = director.construct((b) =>
      b
        .setPhoneNumber(message.phoneNumber)
        .setMessage(message.message)
        .setSenderId(message.senderId || "")
        .setDeliveryReportRequired(message.deliveryReportRequired || false)
        .setScheduleTime(new Date(message.scheduleTime || new Date()))
    );

    return sms.send();
  }
}
