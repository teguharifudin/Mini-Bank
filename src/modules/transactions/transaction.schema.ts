import * as z from "zod";
import { buildJsonSchemas } from 'fastify-zod';

const transactionCore = {
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

const createTransactionSchema = z.object({
    ...transactionCore,
});

const transactionsResponseSchema = z.array(createTransactionSchema);

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>

export const { schemas: transactionSchemas, $ref } = buildJsonSchemas({
    transactionsResponseSchema
}, {
    $id: 'transactionSchemas'
});
