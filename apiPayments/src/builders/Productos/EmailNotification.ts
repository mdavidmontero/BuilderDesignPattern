import { IPrototype } from "../interfaces/IPrototype";

export class EmailNotification implements IPrototype<EmailNotification> {
  to!: string;
  subject?: string;
  body?: string;
  cc?: string[];
  bcc?: string[];
  attachments?: string[];
  priority?: "alta" | "media" | "baja";

  send(): string {
    return `Enviando Email a ${this.to} con asunto "${this.subject}"`;
  }

  clone(): EmailNotification {
    const clone = new EmailNotification();
    clone.to = this.to;
    clone.subject = this.subject;
    clone.body = this.body;
    clone.cc = this.cc ? [...this.cc] : undefined;
    clone.bcc = this.bcc ? [...this.bcc] : undefined;
    clone.attachments = this.attachments ? [...this.attachments] : undefined;
    clone.priority = this.priority;
    return clone;
  }
}
