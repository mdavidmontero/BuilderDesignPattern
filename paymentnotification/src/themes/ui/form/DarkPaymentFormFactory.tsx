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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createPayment } from "@/modules/payments/actions/paymentApi";

export class DarkPaymentFormFactory implements BasePaymentFormFactory {
  createForm() {
    const Form = () => {
      const [tipoPago, setTipoPago] = useState("");
      const [monto, setMonto] = useState("");
      const [email, setEmail] = useState("");
      const [name, setName] = useState("");
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
          name,
          type: tipoPago,
          amount: parseFloat(monto),
          email,
        };
        mutate(data);
      };

      return (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 bg-zinc-900 text-white rounded-xl shadow space-y-4 border border-zinc-700"
        >
          <div>
            <Label className="text-white">Tipo de Pago</Label>
            <Select onValueChange={setTipoPago}>
              <SelectTrigger className="mt-1 bg-zinc-800 border-zinc-600 text-white">
                <SelectValue placeholder="Selecciona un tipo" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 text-white">
                <SelectItem value="credit_card">Tarjeta de Crédito</SelectItem>
                <SelectItem value="debit_card">Tarjeta de Debito</SelectItem>
                <SelectItem value="paypal">Paypal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-white">Monto</Label>
            <Input
              type="number"
              placeholder="Ingrese el monto"
              value={monto}
              min="0"
              onChange={(e) => setMonto(e.target.value)}
              className="mt-1 bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400"
            />
          </div>
          <div>
            <Label className="text-white">Email</Label>
            <Input
              type="email"
              placeholder="Ingrese su email"
              value={email}
              min="0"
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400"
            />
          </div>
          <div>
            <Label className="text-white">Nombre</Label>
            <Input
              type="text"
              placeholder="Ingrese su nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-cyan-700 hover:bg-cyan-600 text-white"
          >
            Enviar
          </Button>
        </form>
      );
    };

    return <Form />;
  }
}
