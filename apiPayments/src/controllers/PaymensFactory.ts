import { IPaymentProcessor } from "../services/payments";

export abstract class PaymentFactory {
  abstract createPayment(): IPaymentProcessor;

  proccess(amount: number): number {
    const payment = this.createPayment();
    return payment.process(amount);
  }
}
