import { INotificationBuilder } from "../interfaces/INotificationBuilder";
import { SmsNotification } from "./SmsNotification";

export interface ISmsBuilder extends INotificationBuilder<SmsNotification> {
  setPhoneNumber(phoneNumber: string): this;
  setMessage(message: string): this;
  setSenderId(senderId: string): this;
  setDeliveryReportRequired(deliveryReportRequired: boolean): this;
  setScheduleTime(scheduleTime: Date): this;
}
