import {Request, Response}                 from 'express';
import * as httpStatus                     from 'http-status';
import Controller                          from '../Controller';
import CustomerGet                         from '../../../../contexts/mmc/customers/application/CustomerGet';
import CustomerNotExistsException          from '../../../../contexts/mmc/shared/domain/exceptions/CustomerNotExistsException';
import YouAreNotOwnerOfTheElementException from '../../../../contexts/mmc/shared/domain/exceptions/YouAreNotOwnerOfTheElementException';

export class CustomerGetController implements Controller
{
    constructor(private customerGet: CustomerGet)
    {
    }

    async run(req: Request, res: Response)
    {
        return new Promise(async (resolve, reject) =>
        {
            try {
				const id: number = Number(req.params.id);
				const customer = await this.customerGet.run(id);

                resolve(res.status(httpStatus.OK).send(customer));
            }
            catch (error) {
                let httpStatusError = httpStatus.INTERNAL_SERVER_ERROR;

                if (error instanceof CustomerNotExistsException || error instanceof YouAreNotOwnerOfTheElementException) {
                    httpStatusError = httpStatus.BAD_REQUEST;
                }

                reject(res.status(httpStatusError).send(error.message));
            }
        });
    }
}
