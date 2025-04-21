import { z } from "zod";

export const paymentSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(
    z.object({
      type: z.string(),
      amount: z.number(),
    })
  ),
});

export type Payment = z.infer<typeof paymentSchema>;
