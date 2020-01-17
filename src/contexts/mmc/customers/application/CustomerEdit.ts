import {Customer}            from '../domain/entity/Customer';
import CustomerRepository    from '../domain/CustomerRepository';
import CustomerEditDto       from '../domain/dto/CustomerEditDto';
import CustomerNotExistGuard from '../../shared/application/CustomerNotExistGuard';

export default class CustomerCreate
{
    private repository: CustomerRepository;

    constructor(repository: CustomerRepository)
    {
        this.repository = repository;
    }

    async run(customerEditDto: CustomerEditDto): Promise<Customer>
    {
        const customer: Customer = await this.repository.findOneOrFail(customerEditDto.id);

        await new CustomerNotExistGuard(customerEditDto.id, customer);

        customer.email     = customerEditDto.email ? customerEditDto.email : customer.email;
        customer.firstName = customerEditDto.firstName ? customerEditDto.firstName : customer.firstName;
        customer.lastName  = customerEditDto.lastName ? customerEditDto.lastName : customer.lastName;

        const editedCustomer: Customer = await this.repository.update(customer);

        return Promise.resolve(editedCustomer);
    }
}