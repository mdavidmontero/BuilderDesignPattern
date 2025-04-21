export interface IPaymentProcessor {
  process(amount: number): number;
}
