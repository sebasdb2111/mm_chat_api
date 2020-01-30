import {Customer}         from '../domain/entity/Customer';
import CustomerRepository from '../domain/CustomerRepository';
import CustomerCreateDto  from '../domain/dto/CustomerCreateDto';

export default class CustomerCreate
{
    private repository: CustomerRepository;

    constructor(repository: CustomerRepository)
    {
        this.repository = repository;
    }

    async run(customerDto: CustomerCreateDto): Promise<Customer>
    {
        const customer: Customer = new Customer();
        customer.username        = customerDto.username;
        customer.password        = customerDto.password;
        customer.email           = customerDto.email;
        customer.firstName       = customerDto.firstName;
        customer.lastName        = customerDto.lastName;
        customer.isActive        = true;
        customer.dateBirth       = customerDto.dateBirth;

        customer.hashPassword();

        const newCustomer: Customer = await this.repository.save(customer);

        return Promise.resolve(newCustomer);
    }
}
