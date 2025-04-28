import { useQuery } from "@tanstack/react-query";
import { getAllPayments } from "../actions/paymentApi";

interface ListPaymentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelectPayment: (payment: any) => void;
}

const ListPayment: React.FC<ListPaymentProps> = ({ onSelectPayment }) => {
  const { data: payments } = useQuery({
    queryKey: ["payments"],
    queryFn: getAllPayments,
  });

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Lista de Pagos
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-left border-collapse">
          <thead className="bg-cyan-700 dark:bg-cyan-800 text-white">
            <tr>
              <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider">
                Tipo de Pago
              </th>
              <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider">
                Monto
              </th>
            </tr>
          </thead>
          <tbody>
            {payments?.data.map((payment, idx) => (
              <tr
                key={idx}
                className="border-b hover:bg-cyan-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                onClick={() => onSelectPayment(payment)}
              >
                <td className="px-6 py-4 text-gray-700 dark:text-gray-200">
                  {payment.name}
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-200">
                  {payment.type}
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-200">
                  {payment.amount}
                </td>
              </tr>
            ))}
            {payments?.data.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                  No hay pagos registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListPayment;
