export class EmailNotification {
  to!: string;
  subject?: string;
  body?: string;
  cc?: string[];
  bcc?: string[];
  attachments?: string[];
  priority?: "alta" | "media" | "baja";

  send(): string {
    return `Enviando Email a ${this.to} con asunto "${this.subject}",`;
  }
}
