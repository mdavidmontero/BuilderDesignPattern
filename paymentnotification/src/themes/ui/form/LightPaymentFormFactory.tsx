import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { BasePaymentFormFactory } from "@/interfaces/BasePaymentFormFactory";
import { createPayment } from "@/modules/payments/actions/paymentApi";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export class LightPaymentFormFactory implements BasePaymentFormFactory {
  createForm() {
    const Form = () => {
      const [tipoPago, setTipoPago] = useState("");
      const [monto, setMonto] = useState("");

      const queryClient = useQueryClient();
      const { mutate } = useMutation({
        mutationFn: createPayment,
        onError: (error) => {
          toast.error(error.message);
        },
        onSuccess: (data) => {
          toast.success(data.message);
          setTipoPago("");
          setMonto("");
          queryClient.invalidateQueries({ queryKey: ["payments"] });
        },
      });
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
          type: tipoPago,
          amount: parseFloat(monto),
        };
        mutate(data);
      };

      return (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 bg-white rounded-xl shadow space-y-4 border"
        >
          <div>
            <Label className="text-black">Tipo de Pago</Label>
            <Select onValueChange={setTipoPago}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Selecciona un tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credit_card">Tarjeta de Crédito</SelectItem>
                <SelectItem value="debit_card">Tarjeta de Debito</SelectItem>
                <SelectItem value="paypal">Paypal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Monto</Label>
            <Input
              type="number"
              min="0"
              placeholder="Ingrese el monto"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              className="mt-1"
            />
          </div>

          <Button type="submit" className="w-full">
            Enviar
          </Button>
        </form>
      );
    };

    return <Form />;
  }
}
