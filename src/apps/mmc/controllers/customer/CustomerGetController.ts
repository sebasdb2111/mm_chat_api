import {Request, Response}    from 'express';
import * as httpStatus        from 'http-status';
import Controller             from '../Controller';
import CustomerGet                from '../../../../contexts/mmc/customers/application/CustomerGet';
import CustomerNotExistsException from '../../../../contexts/mmc/shared/domain/exceptions/CustomerNotExistsException';

export class CustomerGetController implements Controller
{
    constructor(private userGet: CustomerGet)
    {
    }

    async run(req: Request, res: Response)
    {
        const id: number = Number(req.params.id);

        try {
            const user = await this.userGet.run(id);
            res.status(httpStatus.CREATED).send(user);
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
