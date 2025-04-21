import { useThemeStore } from "@/store/themeStore";
import { LightPaymentFormFactory } from "./LightPaymentFormFactory";
import { DarkPaymentFormFactory } from "./DarkPaymentFormFactory";
import { BasePaymentFormFactory } from "@/interfaces/BasePaymentFormFactory";

export const usePaymentFormFactory = (): BasePaymentFormFactory => {
  const { theme } = useThemeStore();

  switch (theme.name) {
    case "dark":
      return new DarkPaymentFormFactory();
    default:
      return new LightPaymentFormFactory();
  }
};
