import * as z from "zod";
import { buildJsonSchemas } from 'fastify-zod';

const withdrawCore = {
    currency: z.string({
        required_error: "Currency is required"
    }),
    amount: z.number({
        required_error: "Amount is required"
    }),
    toAddress: z.string({
        required_error: "Recepient is required"
    }),
}

const createWithdrawSchema = z.object({
    ...withdrawCore,
});

const createWithdrawResponseSchema = z.object({
    id: z.number(),
    ...withdrawCore,
});

export type CreateWithdrawInput = z.infer<typeof createWithdrawSchema>

export const { schemas: withdrawSchemas, $ref } = buildJsonSchemas({
    createWithdrawSchema,
    createWithdrawResponseSchema,
}, {
    $id: 'withdrawSchemas'
});
