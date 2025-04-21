import { IPaymentProcessor } from "../../../services/payments";

export class CreditCardProcessor implements IPaymentProcessor {
  process(amount: number): number {
    let finalAmount = amount + amount * 0.03;
    if (amount > 1000) finalAmount += 10;
    return finalAmount;
  }
}
