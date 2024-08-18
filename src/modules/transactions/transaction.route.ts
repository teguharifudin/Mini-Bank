import { FastifyInstance } from "fastify";

import { getTransactionsHandler, getProfileHandler } from "./transaction.controller";
import { $ref } from "./transaction.schema";

async function transactionRoutes(fastify: FastifyInstance) {
    fastify.get(
        '/',
        {
            preHandler: [fastify.authenticate],
            schema: {
                response: {
                    201: $ref("transactionsResponseSchema")
                }
            }
        },
        getTransactionsHandler
    );

    fastify.get(
        '/me',
        {
            preHandler: [fastify.authenticate],
        },
        getProfileHandler
    );
};

export default transactionRoutes;