import { z } from "zod";

export const paymentSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(
    z.object({
      name: z.string(),
      type: z.string(),
      amount: z.number(),
      email: z.string(),
    })
  ),
});

export type Payment = z.infer<typeof paymentSchema>;
