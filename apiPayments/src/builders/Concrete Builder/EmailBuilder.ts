import { IEmailBuilder } from "../Builder/IEmailBuilder";
import { EmailNotification } from "../Productos/EmailNotification";



export class EmailBuilder implements IEmailBuilder {
 
  private email: EmailNotification;

  constructor() {
    this.email = new EmailNotification();
  }

  reset(): void {
    this.email = new EmailNotification();
  }

  setTo(to: string): this {
    this.email.to = to;
    return this;
  }

  setSubject(subject: string): this {
    this.email.subject = subject;
    return this;
  }

  setBody(body: string): this {
    this.email.body = body;
    return this;
  }

  setCc(cc: string[]): this {
    this.email.cc = cc;
    return this;
  }

  setBcc(bcc: string[]): this {
    this.email.bcc = bcc;
    return this;
  }

  setAttachments(attachments: string[]): this {
    this.email.attachments = attachments;
    return this;
  }
  setPriority(priority: 'alta' | 'media' | 'baja') {
    this.email.priority = priority;
    return this;
  }

  build(): EmailNotification {
    return this.email;
  }
}
