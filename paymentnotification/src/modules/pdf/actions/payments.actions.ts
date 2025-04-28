import apiAxios from "@/config/apiAxios";

export interface PDFGenerate {
  includeLogo: boolean;
  title: string;
  footerMessage: string;
  theme: string;
  includeTimestamp: boolean;
  format: string;
  includePaymentDetails: boolean;
  includeUserInfo: boolean;
  payment: Payment;
  name: string;
  email: string;
}

export interface Payment {
  name: string;
  type: string;
  amount: number;
  email: string;
}

export const createPdfFactura = async (formData: PDFGenerate) => {
  try {
    const { data } = await apiAxios.post("/generate-pdf", formData);
    return data;
  } catch (error) {
    console.log(error);
  }
};
