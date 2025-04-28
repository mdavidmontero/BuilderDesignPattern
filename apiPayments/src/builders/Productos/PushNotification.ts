export class PushNotification {
  deviceToken!: string;
  title?: string;
  message!: string;
  imageUrl?: string;
  clickAction?: string;
  priority?: "urgente" | "normal";

  send(): string {
    return `Push enviado al token ${this.deviceToken} con título "${this.title}"`;
  }
}
