import { INotificationBuilder } from "../interfaces/INotificationBuilder";
import { PushNotification } from "./PushNotification";

export interface IPushBuilder extends INotificationBuilder<PushNotification> {
  setDeviceToken(token: string): this;
  setTitle(title: string): this;
  setMessage(message: string): this;
  setImageUrl(url: string): this;
  setClickAction(action: string): this;
  setPriority(priority: 'urgente' | 'normal'): this;
}
