import { IPaymentProcessor } from "../../../services/payments";

export class DebitCardProcessor implements IPaymentProcessor {
  process(amount: number): number {
    let finalAmount = amount + amount * 0.01;
    if (amount > 500) finalAmount += 5;
    return finalAmount;
  }
}
