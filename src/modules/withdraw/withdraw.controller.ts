import { FastifyReply, FastifyRequest } from "fastify";

import { CreateWithdrawInput } from "./withdraw.schema";
import { createWithdraw, findUserByEmail, findUserById, debtUpdated, findUserLoanById, loanUpdated, createHistory, 
    // cronUpdated 
} from "./withdraw.service";
// import { CronJob } from 'cron';

export async function createWithdrawHandler(
    request: FastifyRequest<{
        Body: CreateWithdrawInput
    }>, 
    reply: FastifyReply
) {
    
    const email = await findUserByEmail(request.body.toAddress);
    const account = await findUserById( email?.id );
    const accountLoan = await findUserLoanById( email?.id );

    const curAccount: any = account?.total;
    const curWithdraw: any = request.body.amount;
    const curTotal: any = ((+curAccount)+(+curWithdraw));

    const curLoanAccount: any = accountLoan?.total;
    const curLoan: any = ((+curLoanAccount)+(+curWithdraw));

    const withdraw = await createWithdraw({
        ...request.body,
        userId: request.user.id,
        accountId: account?.id,
    })

    await debtUpdated(account?.id, email?.id, curTotal);

    await loanUpdated(accountLoan?.id, email?.id, curLoan);

    // const cronJob = new CronJob('0 0 5 * * *', async () => {
    //     try {
    //         await cronUpdated(accountLoan?.id, email?.id, 0);
    //     } catch (e) {
    //         console.error(e);
    //     }
    // });

    await createHistory(request.user.id, withdraw.id );

    return withdraw;
};

