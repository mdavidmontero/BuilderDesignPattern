import PdfPrinter from "pdfmake";
import path from "path";
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

const fonts = {
  Roboto: {
    normal: path.resolve(__dirname, "../../fonts/Roboto-Regular.ttf"),
    bold: path.resolve(__dirname, "../../fonts/Roboto-Medium.ttf"),
    italics: path.resolve(__dirname, "../../fonts/Roboto-Italic.ttf"),
    bolditalics: path.resolve(__dirname, "../../fonts/Roboto-MediumItalic.ttf"),
  },
};

export class PDFBuilder {
  private docDefinition: any;
  private options: PDFGenerate;
  private logoPath: string;

  constructor(options: PDFGenerate) {
    this.options = options;
    this.docDefinition = {
      pageSize: options.format === "A4" ? "A4" : "LETTER",
      content: [],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 14,
          bold: true,
        },
        normal: {
          fontSize: 12,
        },
        footer: {
          fontSize: 10,
          alignment: "center",
          italics: true,
        },
      },
    };
    this.logoPath = path.resolve(__dirname, "../../assets/logo.png");
  }

  addTitle() {
    this.docDefinition.content.push({
      text: this.options.title,
      style: "header",
      alignment: "center",
      marginBottom: 20,
    });
    return this;
  }

  addLogo() {
    if (this.options.includeLogo) {
      this.docDefinition.content.push({
        image: this.logoPath,
        width: 100,
        height: 100,
        alignment: "center",
      });
    }
    return this;
  }

  addPaymentDetails() {
    if (this.options.includePaymentDetails) {
      this.docDefinition.content.push({
        text: "Número de transacción: 123456789",
        style: "normal",
        marginBottom: 10,
      });
      this.docDefinition.content.push({
        text: `Tipo de pago: ${this.options.payment.type}`,
        style: "normal",
        marginBottom: 10,
      });
    }
    return this;
  }

  addUserInfo() {
    this.docDefinition.content.push({
      text: `Nombre del usuario: ${
        this.options.payment.name || "No disponible"
      }`,
      style: "normal",
      marginBottom: 10,
    });
    return this;
  }

  addTimestamp() {
    if (this.options.includeTimestamp) {
      this.docDefinition.content.push({
        text: "Fecha y hora: " + new Date().toLocaleString(),
        style: "normal",
        marginBottom: 10,
      });
    }
    return this;
  }

  addFooter() {
    this.docDefinition.content.push({
      text: this.options.footerMessage,
      style: "footer",
      marginTop: 30,
    });
    return this;
  }

  createPdf() {
    const printer = new PdfPrinter(fonts);
    return printer.createPdfKitDocument(this.docDefinition);
  }
}
