import { NotificationDirector } from "../../../builders/directors/NotificationDirector";
import { EmailBuilder } from "../../../builders/email/EmailBuilder";
import { EmailNotification } from "../../../builders/email/EmailNotification";
import { INotificationProcessor } from "../../../services/notifications";
import { IEmailBuilder } from "../../../builders/email/IEmailBuilder";

export class EmailProcessor implements INotificationProcessor {
  process(message: any): string {
    const builder = new EmailBuilder();
    const director = new NotificationDirector<EmailNotification, IEmailBuilder>();

    director.setBuilder(builder);

    const email = director.construct(b =>
      b.setTo(message.to)
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
