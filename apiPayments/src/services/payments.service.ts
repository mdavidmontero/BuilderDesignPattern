import { PaymentProcessorFactory } from "../controllers/factorie/paymentFactory";

export const processPayment = (type: string, amount: number): number => {
  const factory = PaymentProcessorFactory.createProcessor(type);
  const result = factory.proccess(amount);
  return result;
};
