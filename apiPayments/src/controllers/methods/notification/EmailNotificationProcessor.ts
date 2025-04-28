import { NotificationDirector } from "../../../builders/directors/NotificationDirector";
import { EmailNotification } from "../../../builders/Productos/EmailNotification";
import { INotificationProcessor } from "../../../services/notifications";
import { IEmailBuilder } from "../../../builders/Builder/IEmailBuilder";
import { EmailBuilder } from "../../../builders/Concrete Builder/EmailBuilder";

export class EmailProcessor implements INotificationProcessor {
  process(message: any): string {
    const builder = new EmailBuilder();
    const director = new NotificationDirector<
      EmailNotification,
      IEmailBuilder
    >();

    director.setBuilder(builder);

    const email = director.construct((b) =>
      b
        .setTo(message.to)
        .setSubject(message.subject)
        .setBody(message.body)
        .setCc(message.cc || [])
        .setBcc(message.bcc || [])
        .setAttachments(message.attachments || [])
        .setPriority(message.priority || "normal")
    );

    return email.send();
  }
}
