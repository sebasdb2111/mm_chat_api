import {Request, Response}            from 'express';
import * as httpStatus                from 'http-status';
import Controller                     from '../Controller';
import CustomerCreate                 from '../../../../contexts/mmc/customers/application/CustomerCreate';
import CustomerCreateDto              from '../../../../contexts/mmc/customers/domain/dto/CustomerCreateDto';
import CustomerAlreadyExistsException from '../../../../contexts/mmc/customers/domain/exceptions/CustomerAlreadyExistsException';

export class CustomerCreateController implements Controller
{
    constructor(private customerCreate: CustomerCreate)
    {
    }

    async run(req: Request, res: Response)
    {
        const customerCreateDto: CustomerCreateDto = new CustomerCreateDto(
            req.body.username,
            req.body.password,
            req.body.role,
            req.body.email,
            req.body.firstName,
            req.body.lastName,
            req.body.isActive,
        );

        try {
            const customer = await this.customerCreate.run(customerCreateDto);
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
