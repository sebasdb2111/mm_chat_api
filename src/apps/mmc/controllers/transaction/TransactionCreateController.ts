import {Request, Response}  from 'express';
import * as httpStatus      from 'http-status';
import Controller           from '../Controller';
import TransactionCreate    from '../../../../contexts/mmc/transactions/application/TransactionCreate';
import TransactionCreateDto from '../../../../contexts/mmc/transactions/domain/dto/TransactionCreateDto';

export class TransactionCreateController implements Controller
{
    constructor(private transactionCreate: TransactionCreate)
    {
    }

    async run(req: Request, res: Response)
    {
        return new Promise(async (resolve, reject) =>
        {
            const transactionCreateDto: TransactionCreateDto = new TransactionCreateDto(
                Number(req.body.customerId),
                Number(req.body.total),
                req.body.currency,
                Number(req.body.paymentMethodId),
                Number(req.body.psychicOfferId),
            );

            try {
                const transaction = await this.transactionCreate.run(transactionCreateDto);

                resolve(res.status(httpStatus.CREATED).send(transaction));
            }
            catch (error) {
                let httpStatusError = httpStatus.INTERNAL_SERVER_ERROR;

                reject(res.status(httpStatusError).send(error.message));
            }
        });
    }
}
