import { IPaymentProcessor } from "../../../services/payments";
import { CreditCardProcessor } from "../../methods/payment/CreditCardProcessor";
import { PaymentFactory } from "../../PaymensFactory";

export class CreditCarPaymentFactory extends PaymentFactory {
  createPayment(): IPaymentProcessor {
    return new CreditCardProcessor();
  }
}
