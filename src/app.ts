import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import fjwt, { FastifyJWT } from '@fastify/jwt';
import fCookie from '@fastify/cookie';

import userRoutes from "./modules/user/user.route";
import { userSchemas } from './modules/user/user.schema';
import { sendSchemas } from './modules/send/send.schema';
import sendRoutes from "./modules/send/send.route";
import { withdrawSchemas } from './modules/withdraw/withdraw.schema';
import withdrawRoutes from "./modules/withdraw/withdraw.route";
import { transactionSchemas } from './modules/transactions/transaction.schema';
import transactionRoutes from "./modules/transactions/transaction.route";

const fastify = Fastify();

fastify.register(fjwt, {
    secret: process.env.JWT_SECRET || 'SECRET'
});

fastify.addHook('preHandler', (req, res, next) => {
    req.jwt = fastify.jwt
    return next()
});

fastify.register(fCookie, {
    secret: process.env.COOKIE_SECRET || 'SECRET',
    hook: 'preHandler',
})

fastify.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply) => {
        const token = request.cookies.access_token;

        if (!token) {
            return reply.status(401).send({ message: 'Authentication required' })
        }

        const decoded = request.jwt.verify<FastifyJWT['user']>(token)
        request.user = decoded
    }
)

fastify.post('/helloworld', async (request: FastifyRequest, reply: FastifyReply) => {
    return { message: 'Hello World!' }
})

async function main() {
    for (const schema of [...userSchemas, ...sendSchemas, ...withdrawSchemas, ...transactionSchemas]) {
        fastify.addSchema(schema);
    };

    fastify.register(require('@fastify/swagger'), {});
    fastify.register(require('@fastify/swagger-ui'), {
        routePrefix: '/docs',
        swagger: {
            info: {
                title: 'Fastify Prisma REST API',
                description: 'A REST API built with Fastify, Prisma and TypeScript',
                version: '1.0.0',
                contact: {
                    name: "Teguh Arief",
                    url: "https://teguharief.com",
                    email: "teguh.arifudin@gmail.com"
                },
            },
            externalDocs: {
                url: 'https://github.com/teguharifudin/Mini-Bank',
                description: 'Build a RESTful API using Node.js, Fastify, Prisma, TypeScript, PostgreSQL with Swagger for a mini bank.',
            },
            host: '0.0.0.0:3000',
            basePath: '/',
            schemes: ['http', 'https'],
            consumes: ['application/json'],
            produces: ['application/json'],
        },
        uiConfig: {
            docExpansion: 'none',
            deepLinking: true,
        },
        staticCSP: false,
        transformStaticCSP: (header: any) => header,
        exposeRoute: true
    });

    fastify.ready(err => {
        if (err) throw err
        fastify.swagger()
    })

    fastify.register(userRoutes, { prefix: 'users' })
    fastify.register(sendRoutes, { prefix: 'send' })
    fastify.register(withdrawRoutes, { prefix: 'withdraw' })
    fastify.register(transactionRoutes, { prefix: 'transactions' })

    try {
        await fastify.listen({ port: 3000, host: "0.0.0.0" });
        console.log("Server listening at http://localhost:3000");

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main();
