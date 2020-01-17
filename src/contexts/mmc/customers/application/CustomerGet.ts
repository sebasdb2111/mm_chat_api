import {Customer}            from '../domain/entity/Customer';
import CustomerRepository    from '../domain/CustomerRepository';
import CustomerNotExistGuard from '../../shared/application/CustomerNotExistGuard';

export default class CustomerCreate
{
    private repository: CustomerRepository;

    constructor(repository: CustomerRepository)
    {
        this.repository = repository;
    }

    async run(customerId: number): Promise<Customer>
    {
        const customer: Customer = await this.repository.findOneOrFail(customerId);

        await new CustomerNotExistGuard(customerId, customer);

        return Promise.resolve(customer);
    }
}
