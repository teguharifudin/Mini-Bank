import { hashPassword } from "../../utils/hash";
import { db } from "../../utils/prisma";
import { CreateUserInput } from "./user.schema";

export async function createUser(input: CreateUserInput) {

    const { password, amount, ...rest } = input;

    const { hash, salt } = hashPassword(password);

    const user = await db.user.create({
        data: {
            ...rest, 
            salt, 
            password: hash
        }
    });

    // each user will default to the first bank account
    await db.account.create({
        data: {
            userId: user.id,
            type: 'DEBIT', 
            total: amount
        }
    });

    await db.account.create({
        data: {
            userId: user.id,
            type: 'CREDIT', 
            total: 0
        }
    });

    await db.account.create({
        data: {
            userId: user.id,
            type: 'LOAN', 
            total: 0
        }
    });

    return user;
};

export async function findUserByEmail(email: string) {
    return db.user.findUnique({
        where: {
            email
        }
    })
};

export async function getUsers() {
    return db.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
        }
    });
}