import { CreditCarPaymentFactory } from "../factories/payment/credict.factories";
import { DebitCardPaymentFactory } from "../factories/payment/debit.factories";
import { PaypalPaymentFactory } from "../factories/payment/paypal.factories";
import { PaymentFactory } from "../PaymensFactory";

export class PaymentProcessorFactory {
  static createProcessor(type: string): PaymentFactory {
    switch (type) {
      case "credit_card":
        return new CreditCarPaymentFactory();
      case "debit_card":
        return new DebitCardPaymentFactory();
      case "paypal":
        return new PaypalPaymentFactory();
      default:
        throw new Error("Método de pago no soportado");
    }
  }
}
