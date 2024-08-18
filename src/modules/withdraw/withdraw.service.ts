import { number } from "zod";
import { db } from "../../utils/prisma";
import { CreateWithdrawInput } from "./withdraw.schema";

export async function createWithdraw(
    data: CreateWithdrawInput & { userId: number } & { accountId: any }
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

export async function findUserById( userId: any ) {
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

export async function findUserLoanById( userId: any ) {
    return db.account.findFirst({
        select: {
            id: true,
            total: true,
        },
        where: {
            userId: userId,
            type: 'LOAN'
        }
    })
};

export async function debtUpdated(accountId: any, userId: any, curTotal: any) {
    return db.account.update({
        where: { id: accountId },
        data: { 
            userId: userId,
            type: 'DEBIT',
            total: curTotal 
        },
    });
};

export async function loanUpdated(accountId: any, userId: any, curLoan: any) {
    return db.account.update({
        where: { id: accountId },
        data: { 
            userId: userId,
            type: 'LOAN',
            total: curLoan 
        },
    });
};

// export async function cronUpdated(accountId: any, userId: any, curLoan: any) {
//     return db.account.update({
//         where: { id: accountId },
//         data: { 
//             userId: userId,
//             type: 'LOAN',
//             total: curLoan 
//         },
//     });
// };

export async function createHistory(userId: any, transactionId: number) {
    return db.history.create({
        data: { 
            userId: userId,
            transactionId: transactionId 
        },
    });
};