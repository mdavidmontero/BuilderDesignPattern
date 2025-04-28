import { Request, Response } from "express";
import { PDFBuilder, PDFGenerate } from "./pdfController";

export const generatePDF = (req: Request, res: Response) => {
  const options: PDFGenerate = req.body;

  const builder = new PDFBuilder(options);
  const docDefinition = builder
    .addTitle()
    .addLogo()
    .addPaymentDetails()
    .addUserInfo()
    .addTimestamp()
    .addFooter()
    .createPdf();

  const chunks: any[] = [];
  docDefinition.on("data", (chunk: any) => chunks.push(chunk));
  docDefinition.on("end", () => {
    const result = Buffer.concat(chunks);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=reporte_pago.pdf"
    );
    res.send(result);
  });
  docDefinition.end();
};
