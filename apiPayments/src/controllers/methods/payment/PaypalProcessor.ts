import { IPaymentProcessor } from "../../../services/payments";

export class PaypalProcessor implements IPaymentProcessor {
  process(amount: number): number {
    let finalAmount = amount + amount * 0.02;
    if (amount > 750) finalAmount += 7;
    return finalAmount;
  }
}
