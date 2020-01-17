import {Request, Response}            from 'express';
import * as httpStatus                from 'http-status';
import Controller                     from '../Controller';
import CustomerDeactivate             from '../../../../contexts/mmc/customers/application/CustomerDeactivate';
import CustomerDeactivateDto          from '../../../../contexts/mmc/customers/domain/dto/CustomerDeactivateDto';
import CustomerNotExistsException     from '../../../../contexts/mmc/shared/domain/exceptions/CustomerNotExistsException';

export class CustomerDeactivateController implements Controller
{
    constructor(private customerDeactivate: CustomerDeactivate)
    {
    }

    async run(req: Request, res: Response)
    {
        return new Promise(async (resolve, reject) =>
        {
            const customerDeactivateDto: CustomerDeactivateDto = new CustomerDeactivateDto(
                Number(req.params.id),
                Boolean(req.body.isActive)
            );

            try {
                await this.customerDeactivate.run(customerDeactivateDto);
                resolve(res.status(httpStatus.OK).send(`Customer ${req.params.id} has been deactivated successfully`));
            }
            catch (error) {
                let httpStatusError = httpStatus.INTERNAL_SERVER_ERROR;

                if (error instanceof CustomerNotExistsException) {
                    httpStatusError = httpStatus.BAD_REQUEST;
                }

                reject(res.status(httpStatusError).send(error.message));
            }
        });
    }
}
