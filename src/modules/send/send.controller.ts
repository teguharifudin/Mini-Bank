import { FastifyReply, FastifyRequest } from "fastify";

import { CreateSendInput } from "./send.schema";
import { createSend, findUserByEmail, findUserById, findUserCreditById, findUserDebtCreditById, debtUpdated, debtCreditUpdated, creditUpdated, createHistory } from "./send.service";

export async function createSendHandler(
    request: FastifyRequest<{
        Body: CreateSendInput
    }>, 
    reply: FastifyReply
) {
    
    const account = await findUserById( request.user.id );
    const accountDebtCredit = await findUserDebtCreditById( request.user.id );

    const curAccount: any = accountDebtCredit?.total;
    const curDebtCredit: any = account?.total;
    const curSend: any = request.body.amount;
    const curTotal: any = ((+curAccount)-(+curSend));
    const curTotalDebtCredit: any = ((+curDebtCredit)+(+curSend));
    await debtCreditUpdated(accountDebtCredit?.id, request.user.id, curTotal); // sender debit
    await debtUpdated(account?.id, request.user.id, curTotalDebtCredit); // sender credit
    
    const emailCredit = await findUserByEmail(request.body.toAddress);
    const accountCredit = await findUserCreditById( emailCredit?.id );
    const curAccountCredit: any = accountCredit?.total;
    const curSendCredit: any = request.body.amount;
    const curTotalCredit: any = ((+curAccountCredit)+(+curSendCredit));
    await creditUpdated(accountCredit?.id, emailCredit?.id, curTotalCredit); // receiver debit

    const send = await createSend({
        ...request.body,
        userId: request.user.id,
        accountId: account?.id,
    })

    await createHistory(request.user.id, send.id );

    return send;
};