import { FastifyReply, FastifyRequest } from "fastify";
import { getTransactions } from "./transaction.service";
import { db } from "../../utils/prisma";

export async function getTransactionsHandler() {
    const transactions = await getTransactions();

    return transactions;
};

export async function getProfileHandler(request: FastifyRequest | any, reply: FastifyReply) {
    const profile = await db.transaction.findMany({
        where: {
            userId: request.userId
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                }
            },
            account: {
                select: {
                    id: true,
                    type: true,
                    total: true,
                }
            }
        }
    });
    return profile;
}