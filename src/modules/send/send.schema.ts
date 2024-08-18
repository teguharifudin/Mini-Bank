import * as z from "zod";
import { buildJsonSchemas } from 'fastify-zod';

const sendCore = {
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

const createSendSchema = z.object({
    ...sendCore,
});

const createSendResponseSchema = z.object({
    id: z.number(),
    ...sendCore,
});

export type CreateSendInput = z.infer<typeof createSendSchema>

export const { schemas: sendSchemas, $ref } = buildJsonSchemas({
    createSendSchema,
    createSendResponseSchema,
}, {
    $id: 'sendSchemas'
});
