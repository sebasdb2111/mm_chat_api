import {Request, Response}        from 'express';
import * as httpStatus            from 'http-status';
import Controller                 from '../Controller';
import CustomerCreate                 from '../../../../contexts/mmc/customers/application/CustomerCreate';
import CustomerDto                    from '../../../../contexts/mmc/customers/domain/CustomerDto';
import CustomerAlreadyExistsException from '../../../../contexts/mmc/customers/domain/exceptions/CustomerAlreadyExistsException';

export class CustomerCreateController implements Controller
{
    constructor(private customerCreate: CustomerCreate)
    {
    }

    async run(req: Request, res: Response)
    {
        const customerDto: CustomerDto = new CustomerDto(
            req.body.username,
            req.body.password,
            req.body.email,
            req.body.role
        );

        try {
            const customer = await this.customerCreate.run(customerDto);
            res.status(httpStatus.CREATED).send(customer);
        }
        catch (error) {
            if (error instanceof CustomerAlreadyExistsException) {
                res.status(httpStatus.BAD_REQUEST).send(error.message);
            } else {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
            }
        }
    }
}
