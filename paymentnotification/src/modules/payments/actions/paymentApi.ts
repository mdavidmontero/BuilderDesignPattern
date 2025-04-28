import apiAxios from "@/config/apiAxios";
import { isAxiosError } from "axios";
import { paymentSchema } from "../types";

interface PaymentType {
  name: string;
  type: string;
  amount: number;
  email: string;
}
export const createPayment = async (formData: PaymentType) => {
  try {
    const { data } = await apiAxios.post("/payment", formData);
    const formEmail = {
      type: "Email",
      to: formData.email,
      subject: "Pago realizado correctamente",
      body: "Gracias por su compra, que vuelva pronto",
    };

    await apiAxios.post("/notification", formEmail);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const getAllPayments = async () => {
  try {
    const { data } = await apiAxios.get("/payment");
    const response = paymentSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
