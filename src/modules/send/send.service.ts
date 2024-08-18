import { number } from "zod";
import { db } from "../../utils/prisma";
import { CreateSendInput } from "./send.schema";
import { request } from "http";

export async function createSend(
    data: CreateSendInput & { userId: number } & { accountId: any }
) {
    await new Promise(resolve => setTimeout(resolve, 30000));
    return db.transaction.create({
        data,
    });
};

export async function findUserByEmail(email: string) {
    return db.user.findUnique({
        where: {
            email
        }
    })
};

export async function findUserById( userId: number ) {
    return db.account.findFirst({
        select: {
            id: true,
            total: true,
        },
        where: {
            userId: userId,
            type: 'CREDIT'
        }
    })
};

export async function findUserDebtCreditById( userId: number ) {
    return db.account.findFirst({
        select: {
            id: true,
            total: true,
        },
        where: {
            userId: userId,
            type: 'DEBIT'
        }
    })
};

export async function findUserCreditById( userId: any ) {
    return db.account.findFirst({
        select: {
            id: true,
            total: true,
        },
        where: {
            userId: userId,
            type: 'DEBIT'
        }
    })
};

export async function debtUpdated(accountId: any, userId: any, curTotalDebtCredit: any) {
    return db.account.update({
        where: { id: accountId },
        data: { 
            userId: userId,
            type: 'CREDIT',
            total: curTotalDebtCredit 
        },
    });
}; // sender credit

export async function debtCreditUpdated(accountId: any, userId: any, curTotal: any) {
    return db.account.update({
        where: { id: accountId },
        data: { 
            userId: userId,
            type: 'DEBIT',
            total: curTotal 
        },
    });
}; // sender debit

export async function creditUpdated(accountId: any, userId: any, curTotalCredit: any) {
    return db.account.update({
        where: { id: accountId },
        data: { 
            userId: userId,
            type: 'DEBIT',
            total: curTotalCredit 
        },
    });
};  // receiver debit

export async function createHistory(userId: any, transactionId: number) {
    return db.history.create({
        data: { 
            userId: userId,
            transactionId: transactionId 
        },
    });
};