import { IPaymentProcessor } from "../../../services/payments";
import { DebitCardProcessor } from "../../methods/payment/DebitCardProcessor";
import { PaymentFactory } from "../../PaymensFactory";

export class DebitCardPaymentFactory extends PaymentFactory {
  createPayment(): IPaymentProcessor {
    return new DebitCardProcessor();
  }
}
