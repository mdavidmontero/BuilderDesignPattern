import apiAxios from "@/config/apiAxios";
import { isAxiosError } from "axios";
import { paymentSchema } from "../types";

interface PaymentType {
  type: string;
  amount: number;
}
export const createPayment = async (formData: PaymentType) => {
  try {
    const { data } = await apiAxios.post("/payment", formData);
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
    console.log(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
