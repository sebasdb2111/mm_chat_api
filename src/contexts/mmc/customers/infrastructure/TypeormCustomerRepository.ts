import {getRepository}    from 'typeorm';
import {Customer}         from '../domain/entity/Customer';
import CustomerRepository from '../domain/CustomerRepository';

export default class TypeormCustomerRepository implements CustomerRepository
{
    async findOneOrFail(id: number): Promise<Customer>
    {
        const customerRepository = getRepository(Customer);
        const customer: Customer = await customerRepository.findOneOrFail(id);
        return Promise.resolve(customer);
    }

    async findOneByUsername(username: string): Promise<Customer>
    {
        const customerRepository = getRepository(Customer);
        const customer: Customer = await customerRepository.findOneOrFail({where: {username}});
        return Promise.resolve(customer);
    }

    async save(customer: Customer): Promise<Customer>
    {
        const customerRepository     = getRepository(Customer);
        const saveCustomer: Customer = await customerRepository.save(customer);
        return Promise.resolve(saveCustomer);
    }

    async update(customer: Customer): Promise<Customer>
    {
        const customerRepository       = getRepository(Customer);
        const updateCustomer: Customer = await customerRepository.save(customer);
        return Promise.resolve(updateCustomer);
    }

    async updateIsActive(id: number, customer: Customer): Promise<void>
    {
        const customerRepository = getRepository(Customer);
        await customerRepository.update(id, {isActive: customer.isActive});
    }

    async updatePassword(id: number, customer: Customer): Promise<void>
    {
        const customerRepository = getRepository(Customer);
        await customerRepository.update(id, {password: customer.password});
    }

    async updateLastLogin(id: number, customer: Customer): Promise<void>
    {
        const customerRepository = getRepository(Customer);
        await customerRepository.update(id, {lastLogin: customer.lastLogin});
    }
}
