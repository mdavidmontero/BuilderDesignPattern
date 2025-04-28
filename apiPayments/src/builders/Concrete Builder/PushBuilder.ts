import { PushNotification } from '../Productos/PushNotification';
import { INotificationBuilder } from '../interfaces/INotificationBuilder';

export class PushBuilder implements INotificationBuilder<PushNotification> {
  private push!: PushNotification;

  reset(): void {
    this.push = new PushNotification();
  }

  setDeviceToken(token: string) {
    this.push.deviceToken = token;
    return this;
  }

  setTitle(title: string) {
    this.push.title = title;
    return this;
  }

  setMessage(message: string) {
    this.push.message = message;
    return this;
  }

  setImageUrl(url: string) {
    this.push.imageUrl = url;
    return this;
  }

  setClickAction(action: string) {
    this.push.clickAction = action;
    return this;
  }

  setPriority(priority: 'urgente' | 'normal') {
    this.push.priority = priority;
    return this;
  }

  build(): PushNotification {
    return this.push;
  }
}
