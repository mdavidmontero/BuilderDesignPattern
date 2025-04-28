export class WhatsappNotification {
  phoneNumber!: string;
  message!: string;
  mediaUrl?: string;
  caption?: string;
  interactiveButtons?: string[];
  language?: string;

  send(): string {
    return `WhatsApp enviado a ${this.phoneNumber}: ${this.message}`;
  }
}
