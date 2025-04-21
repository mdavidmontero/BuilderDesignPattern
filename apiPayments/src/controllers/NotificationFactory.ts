import { INotificationProcessor } from "../services/notifications";

export abstract class NotificationFactory {
    abstract createNotification(): INotificationProcessor;
  
    processNotification(message: string): string {
      const Notificacion = this.createNotification();
      return Notificacion.process(message);
      
    }
  }