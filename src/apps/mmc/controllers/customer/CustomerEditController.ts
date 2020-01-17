import {Request, Response}            from 'express';
import * as httpStatus                from 'http-status';
import Controller                     from '../Controller';
import CustomerEdit                   from '../../../../contexts/mmc/customers/application/CustomerEdit';
import CustomerEditDto                from '../../../../contexts/mmc/customers/domain/dto/CustomerEditDto';
import CustomerNotExistException      from '../../../../contexts/mmc/shared/domain/exceptions/CustomerNotExistsException';

export class CustomerEditController implements Controller
{
    constructor(private customerEdit: CustomerEdit)
    {
    }

    async run(req: Request, res: Response)
    {
        return new Promise(async (resolve, reject) =>
        {
            const customerDto: CustomerEditDto = new CustomerEditDto(
                Number(req.params.id),
                req.body.role,
                req.body.email,
                req.body.firstName,
                req.body.lastName
            );

            try {
                const customer = await this.customerEdit.run(customerDto);
                resolve(res.status(httpStatus.CREATED).send(customer));
            }
            catch (error) {
                let httpStatusError = httpStatus.INTERNAL_SERVER_ERROR;

                if (error instanceof CustomerNotExistException) {
                    httpStatusError = httpStatus.BAD_REQUEST;
                }

                reject(res.status(httpStatusError).send(error.message));
            }
        });
    }
}
