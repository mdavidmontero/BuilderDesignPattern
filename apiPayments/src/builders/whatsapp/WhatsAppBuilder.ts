
import { INotificationBuilder } from '../interfaces/INotificationBuilder';
import { WhatsappNotification } from './WhatsAppNotification';

export class WhatsappBuilder implements INotificationBuilder<WhatsappNotification> {
  private wa!: WhatsappNotification;

  reset(): void {
    this.wa = new WhatsappNotification();
  }

  setPhoneNumber(phoneNumber: string) {
    this.wa.phoneNumber = phoneNumber;
    return this;
  }

  setMessage(message: string) {
    this.wa.message = message;
    return this;
  }

  setMediaUrl(url: string) {
    this.wa.mediaUrl = url;
    return this;
  }

  setCaption(caption: string) {
    this.wa.caption = caption;
    return this;
  }

  setInteractiveButtons(buttons: string[]) {
    this.wa.interactiveButtons = buttons;
    return this;
  }

  setLanguage(lang: string) {
    this.wa.language = lang;
    return this;
  }

  build(): WhatsappNotification {
    return this.wa;
  }
}
