import { FastifyInstance } from "fastify";

import { createSendHandler } from "./send.controller";
import { $ref } from "./send.schema";

async function sendRoutes(fastify: FastifyInstance) {
    fastify.post(
        '/',
        {
            preHandler: [fastify.authenticate],
            schema: {
                body: $ref('createSendSchema'),
                response: {
                    201: $ref('createSendResponseSchema'),
                }
            }
        },
        createSendHandler
    );
};

export default sendRoutes;