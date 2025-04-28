import { Request, Response } from "express";
import { processPayment } from "../services/payments.service";

interface Payment {
  name: string;
  type: string;
  amount: number;
  email: string;
}

const pagos: Payment[] = [];

export class PaymentsController {
  static createPayment(req: Request, res: Response) {
    try {
      const {
        name,
        type,
        amount,
        email,
        // name,
        // includeLogo = true,
        // title = "Factura de Pago",
        // includePaymentDetails = true,
        // includeUserInfo = true,
        // theme = "DARK",
        // includeTimestamp = true,
        // footerMessage = "Gracias por su compra",
        // format = "A4",
      } = req.body;

      const numericAmount = parseFloat(amount);

      const result = processPayment(type, numericAmount);

      const newPayment: Payment = {
        name,
        type,
        amount: result,
        email,
      };

      pagos.push(newPayment);

      res.json({
        message: "Pago realizado correctamente",
        success: true,
        finalAmount: result,
        data: newPayment,
      });
    } catch (error) {
      res.status(400).json({
        message: "Error al procesar el pago",
        success: false,
      });
    }
  }

  static getAllPayments(req: Request, res: Response) {
    res.json({
      success: true,
      message: "Pagos registrados",
      data: pagos,
    });
  }
}
