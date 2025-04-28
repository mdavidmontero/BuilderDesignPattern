export class SmsNotification {
    phoneNumber!: string;
    message!: string;
    senderId?: string;
    deliveryReportRequired?: boolean;
    scheduleTime?: Date;
  
    send(): string {
      return `SMS enviado a ${this.phoneNumber}: ${this.message}`;
    }
  }
  