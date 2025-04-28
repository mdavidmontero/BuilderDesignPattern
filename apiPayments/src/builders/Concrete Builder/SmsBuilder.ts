import { SmsNotification } from "../Productos/SmsNotification";
import { INotificationBuilder } from "../interfaces/INotificationBuilder";

export class SmsBuilder implements INotificationBuilder<SmsNotification> {
  private sms!: SmsNotification;

  reset(): void {
    this.sms = new SmsNotification();
  }

  setPhoneNumber(phoneNumber: string) {
    this.sms.phoneNumber = phoneNumber;
    return this;
  }

  setMessage(message: string) {
    this.sms.message = message;
    return this;
  }

  setSenderId(senderId: string) {
    this.sms.senderId = senderId;
    return this;
  }

  setDeliveryReportRequired(required: boolean) {
    this.sms.deliveryReportRequired = required;
    return this;
  }

  setScheduleTime(date: Date) {
    this.sms.scheduleTime = date;
    return this;
  }

  build(): SmsNotification {
    return this.sms;
  }
}
