import {Request, Response}          from 'express';
import * as httpStatus              from 'http-status';
import Controller                   from '../Controller';
import CreditCreate                 from '../../../../contexts/mmc/credits/application/CreditCreate';
import CreditCreateDto              from '../../../../contexts/mmc/credits/domain/dto/CreditCreateDto';
import CreditAlreadyExistsException from '../../../../contexts/mmc/credits/domain/exceptions/CreditAlreadyExistsException';

export class CreditCreateController implements Controller
{
    constructor(private creditCreate: CreditCreate)
    {
    }

    async run(req: Request, res: Response)
    {
        return new Promise(async (resolve, reject) =>
        {
            const creditCreateDto: CreditCreateDto = new CreditCreateDto(
                req.body.coins,
                res.locals.jwtPayload.customerId,
                req.body.psychicId,
            );

            try {
                const credit = await this.creditCreate.run(creditCreateDto);

                resolve(res.status(httpStatus.CREATED).send(credit));
            }
            catch (error) {
                let httpStatusError = httpStatus.INTERNAL_SERVER_ERROR;

                if (error instanceof CreditAlreadyExistsException) {
                    httpStatusError = httpStatus.BAD_REQUEST;
                }

                reject(res.status(httpStatusError).send(error.message));
            }
        });
    }
}
