import { INotificationBuilder } from "../interfaces/INotificationBuilder";
import { EmailNotification } from "../Productos/EmailNotification";

export interface IEmailBuilder extends INotificationBuilder<EmailNotification> {
  setTo(to: string): this;
  setSubject(subject: string): this;
  setBody(body: string): this;
  setCc(cc: string[]): this;
  setBcc(bcc: string[]): this;
  setAttachments(attachments: string[]): this;
  setPriority(priority: string): this;
}
