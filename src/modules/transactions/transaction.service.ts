import { db } from "../../utils/prisma";

export async function getTransactions() {
    return db.transaction.findMany({
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
}