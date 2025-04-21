import { Request, Response } from "express";
import { processPayment } from "../services/payments.service";

interface Payment {
  type: string;
  amount: number;
}

const pagos: Payment[] = [];

export class PaymentsController {
  static createPayment(req: Request, res: Response) {
    try {
      const { type, amount } = req.body;
      const numericAmount = parseFloat(amount);

      const result = processPayment(type, numericAmount);
      console.log(result);
      const newPayment: Payment = {
        type,
        amount: result,
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
