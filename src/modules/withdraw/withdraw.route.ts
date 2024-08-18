import { FastifyInstance } from "fastify";

import { createWithdrawHandler } from "./withdraw.controller";
import { $ref } from "./withdraw.schema";

async function withdrawRoutes(fastify: FastifyInstance) {
    fastify.post(
        '/',
        {
            preHandler: [fastify.authenticate],
            schema: {
                body: $ref('createWithdrawSchema'),
                response: {
                    201: $ref('createWithdrawResponseSchema'),
                }
            }
        },
        createWithdrawHandler
    );
};

export default withdrawRoutes;