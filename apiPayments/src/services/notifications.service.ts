import { NotificationProcessorFactory } from "../controllers/factorie/notificationFactory";

export const processNotification = (type: string, message: string): string => {
  const factory = NotificationProcessorFactory.createProcessor(type);
  const result = factory.processNotification(message);
  return result;
};
