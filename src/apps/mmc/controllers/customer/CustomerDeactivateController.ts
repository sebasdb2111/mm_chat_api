import {Request, Response}        from 'express';
import * as httpStatus            from 'http-status';
import Controller                 from '../Controller';
import CustomerDeactivate         from '../../../../contexts/mmc/customers/application/CustomerDeactivate';
import CustomerDeactivateDto      from '../../../../contexts/mmc/customers/domain/dto/CustomerDeactivateDto';
import CustomerNotExistsException from '../../../../contexts/mmc/shared/domain/exceptions/CustomerNotExistsException';

export class CustomerDeactivateController implements Controller
{
    constructor(private customerDeactivate: CustomerDeactivate)
    {
    }

    async run(req: Request, res: Response)
    {
        const customerDeactivateDto: CustomerDeactivateDto = new CustomerDeactivateDto(
            Number(req.params.id),
            req.body.isActive
        );

        try {
            await this.customerDeactivate.run(customerDeactivateDto);
            res.status(httpStatus.OK).send(`Customer ${req.params.id} has been deactivated successfully`);
        }
        catch (error) {
            if (error instanceof CustomerNotExistsException) {
                res.status(httpStatus.BAD_REQUEST).send(error.message);
            } else {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
            }
        }
    }
}
