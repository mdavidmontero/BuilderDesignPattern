import { INotificationBuilder } from "../interfaces/INotificationBuilder";
import { WhatsappNotification } from "./WhatsAppNotification";


export interface IWhatsappBuilder extends INotificationBuilder<WhatsappNotification> {
  setPhoneNumber(phoneNumber: string): this;
  setMessage(message: string): this;
  setMediaUrl(mediaUrl: string): this;
  setCaption(caption: string): this;
  setInteractiveButtons(buttons: string[]): this;
  setLanguage(language: string): this;
}
