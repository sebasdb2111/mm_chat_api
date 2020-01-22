import {Customer}                  from '../domain/entity/Customer';
import CustomerRepository          from '../domain/CustomerRepository';
import CustomerDeactivateDto       from '../domain/dto/CustomerDeactivateDto';
import CustomerNotExistGuard       from '../../shared/application/CustomerNotExistGuard';

export default class CustomerDeactivate
{
    private repository: CustomerRepository;

    constructor(repository: CustomerRepository)
    {
        this.repository = repository;
    }

    async run(customerDeactivateDto: CustomerDeactivateDto): Promise<void>
    {
        const customer: Customer = await this.repository.findOneOrFail(customerDeactivateDto.id);
        //TODO: clausulas de guarda

        customer.isActive    = customerDeactivateDto.isActive;

        await new CustomerNotExistGuard(customerDeactivateDto.id, customer);

        const customerDeactivated = await this.repository.updateIsActive(customerDeactivateDto.id, customer)

        return Promise.resolve(customerDeactivated);
    }
}
