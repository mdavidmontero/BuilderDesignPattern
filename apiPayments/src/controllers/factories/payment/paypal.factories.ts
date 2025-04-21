import { IPaymentProcessor } from "../../../services/payments";
import { PaypalProcessor } from "../../methods/payment/PaypalProcessor";
import { PaymentFactory } from "../../PaymensFactory";

export class PaypalPaymentFactory extends PaymentFactory {
  createPayment(): IPaymentProcessor {
    return new PaypalProcessor();
  }
}
