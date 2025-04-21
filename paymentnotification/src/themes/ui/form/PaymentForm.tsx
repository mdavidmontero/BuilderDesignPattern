import { usePaymentFormFactory } from "./PaymentFormFactory";

const PaymentForm = () => {
  const factory = usePaymentFormFactory();
  return factory.createForm();
};

export default PaymentForm;
