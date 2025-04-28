import ListPayment from "../payments/components/ListPayment";
import { Card, CardContent } from "@/components/ui/card";
import { useThemeStore } from "@/store/themeStore";
import PaymentForm from "@/themes/ui/form/PaymentForm";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { createPdfFactura } from "../pdf/actions/payments.actions";
import { toast } from "react-toastify";

export default function HomeScreen() {
  const theme = useThemeStore((state) => state.theme);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [pdfOptions, setPdfOptions] = useState({
    includeLogo: true,
    title: "Soporte de Pago",
    footerMessage: "Gracias por compra",
    theme: theme.name === "dark" ? "DARK" : "LIGHT",
    includeTimestamp: true,
    format: "A4",
    includePaymentDetails: true,
    includeUserInfo: true,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectPayment = (payment: any) => {
    setSelectedPayment(payment);
    setPdfOptions({
      includeLogo: true,
      title: "Soporte de Pago",
      footerMessage: "Gracias por compra",
      theme: theme.name === "dark" ? "DARK" : "LIGHT",
      includeTimestamp: true,
      format: "A4",
      includePaymentDetails: true,
      includeUserInfo: true,
    });
  };

  const { mutate } = useMutation({
    mutationFn: createPdfFactura,
    mutationKey: ["generate-pdf"],
    onError: () => {
      toast.error("Error al generar el PDF");
    },
    onSuccess: () => {
      toast.success("PDF generado correctamente");
    },
  });

  const handleGeneratePDF = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPayment) {
      toast.error("Por favor, selecciona un pago.");
      return;
    }

    const pdfData = {
      includeLogo: pdfOptions.includeLogo,
      title: pdfOptions.title,
      footerMessage: pdfOptions.footerMessage,
      theme: pdfOptions.theme,
      includeTimestamp: pdfOptions.includeTimestamp,
      format: pdfOptions.format,
      includePaymentDetails: pdfOptions.includePaymentDetails,
      includeUserInfo: pdfOptions.includeUserInfo,
      payment: selectedPayment,
      name: selectedPayment.name,
      email: selectedPayment.email,
    };

    mutate(pdfData);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 mt-10 flex flex-col lg:flex-row gap-6">
      <Card className="w-full lg:w-1/2 shadow-lg border border-gray-200 dark:border-zinc-700">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Registrar Pago
          </h2>
          <PaymentForm />
        </CardContent>
      </Card>

      <Card className="w-full lg:w-1/2 shadow-lg border border-gray-200 dark:border-zinc-700">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Personalizar PDF de Pago
          </h2>

          {selectedPayment ? (
            <div>
              <h3 className="text-lg font-semibold mb-2">Detalles del Pago</h3>
              <p>Nombre: {selectedPayment.name}</p>
              <p>Tipo: {selectedPayment.type}</p>
              <p>Monto: {selectedPayment.amount}</p>

              <div className="mt-4">
                <label
                  className="block text-sm font-semibold mb-2"
                  htmlFor="title"
                >
                  Título
                </label>
                <input
                  type="text"
                  id="title"
                  value={pdfOptions.title}
                  onChange={(e) =>
                    setPdfOptions({ ...pdfOptions, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="mt-4">
                <label
                  className="block text-sm font-semibold mb-2"
                  htmlFor="footerMessage"
                >
                  Mensaje de Pie de Página
                </label>
                <input
                  type="text"
                  id="footerMessage"
                  value={pdfOptions.footerMessage}
                  onChange={(e) =>
                    setPdfOptions({
                      ...pdfOptions,
                      footerMessage: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="mt-4">
                <label
                  className="block text-sm font-semibold mb-2"
                  htmlFor="format"
                >
                  Formato de PDF
                </label>
                <select
                  id="format"
                  value={pdfOptions.format}
                  onChange={(e) =>
                    setPdfOptions({ ...pdfOptions, format: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="A4">A4</option>
                  <option value="LETTER">Carta</option>
                  <option value="A3">A3</option>
                </select>
              </div>

              <div className="mt-4">
                <label
                  className="block text-sm font-semibold mb-2"
                  htmlFor="includePaymentDetails"
                >
                  Incluir Detalles de Pago
                </label>
                <select
                  id="includePaymentDetails"
                  value={pdfOptions.includePaymentDetails ? "true" : "false"}
                  onChange={(e) =>
                    setPdfOptions({
                      ...pdfOptions,
                      includePaymentDetails: e.target.value === "true",
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="true">Sí</option>
                  <option value="false">No</option>
                </select>
              </div>

              <div className="mt-4">
                <label
                  className="block text-sm font-semibold mb-2"
                  htmlFor="includelogo"
                >
                  Incluir Logo
                </label>
                <select
                  id="includelogo"
                  value={pdfOptions.includeLogo ? "true" : "false"}
                  onChange={(e) =>
                    setPdfOptions({
                      ...pdfOptions,
                      includeLogo: e.target.value === "true",
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="true">Sí</option>
                  <option value="false">No</option>
                </select>
              </div>

              <div className="mt-4">
                <label
                  className="block text-sm font-semibold mb-2"
                  htmlFor="includeUserInfo"
                >
                  Incluir Información del Usuario
                </label>
                <select
                  id="includeUserInfo"
                  value={pdfOptions.includeUserInfo ? "true" : "false"}
                  onChange={(e) =>
                    setPdfOptions({
                      ...pdfOptions,
                      includeUserInfo: e.target.value === "true",
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="true">Sí</option>
                  <option value="false">No</option>
                </select>
              </div>

              <button
                onClick={handleGeneratePDF}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
              >
                Generar PDF
              </button>
            </div>
          ) : (
            <p className="text-gray-500">
              Selecciona un pago para ver los detalles y personalizar el PDF.
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="w-full lg:w-1/2 shadow-lg border border-gray-200 dark:border-zinc-700">
        <CardContent className="p-6">
          <ListPayment onSelectPayment={handleSelectPayment} />
        </CardContent>
      </Card>
    </div>
  );
}
