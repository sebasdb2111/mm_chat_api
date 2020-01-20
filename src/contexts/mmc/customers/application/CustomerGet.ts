import {Request}                             from 'express';
import {GetIdUsernameAndEntityTypeFromToken} from '../../shared/application/GetIdUsernameAndEntityTypeFromToken';
import {Customer}                            from '../domain/entity/Customer';
import CustomerRepository                    from '../domain/CustomerRepository';
import CustomerNotExistGuard                 from '../../shared/application/CustomerNotExistGuard';
import YouAreNotOwner                        from "../../shared/application/YouAreNotOwner";

export default class CustomerCreate
{
    private repository: CustomerRepository;

    constructor(repository: CustomerRepository)
    {
        this.repository = repository;
    }

    async run(customerId: number, req: Request): Promise<Customer>
    {
        await this.guard(customerId, req);

        const customer: Customer = await this.repository.findOneOrFail(customerId);

        await new CustomerNotExistGuard(customerId, customer);

        return Promise.resolve(customer);
    }

    async guard(customerId: number, req: Request)
    {
        const customerIdToken = GetIdUsernameAndEntityTypeFromToken(req);
        await new YouAreNotOwner(customerId, customerIdToken.customerId);
    }
}
