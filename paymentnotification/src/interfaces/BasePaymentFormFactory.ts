import { ReactNode } from "react";

export interface BasePaymentFormFactory {
  createForm(): ReactNode;
}
