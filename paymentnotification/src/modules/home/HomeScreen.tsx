import PaymentForm from "@/themes/ui/form/PaymentForm";
import ListPayment from "../payments/components/ListPayment";
import { Card, CardContent } from "@/components/ui/card";

export default function HomeScreen() {
  return (
    <div className="max-w-6xl mx-auto px-4 mt-10 flex flex-col lg:flex-row gap-6">
      {/* Formulario */}
      <Card className="w-full lg:w-1/2 shadow-lg border border-gray-200 dark:border-zinc-700">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Registrar Pago
          </h2>
          <PaymentForm />
        </CardContent>
      </Card>

      {/* Lista de pagos */}
      <Card className="w-full lg:w-1/2 shadow-lg border border-gray-200 dark:border-zinc-700">
        <CardContent className="p-6">
          <ListPayment />
        </CardContent>
      </Card>
    </div>
  );
}
