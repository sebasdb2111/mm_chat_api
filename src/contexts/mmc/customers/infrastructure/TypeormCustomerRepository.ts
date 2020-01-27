import {getRepository}           from 'typeorm';
import {Customer}                from '../domain/entity/Customer';
import CustomerRepository        from '../domain/CustomerRepository';
import {EntitiesForRelationEnum} from '../../shared/domain/EntitiesForRelationEnum';

export default class TypeormCustomerRepository implements CustomerRepository
{
    async findOneOrFail(id: number): Promise<Customer>
    {
        try {
            const customerRepository = getRepository(Customer);
            const customer: Customer = await customerRepository.findOneOrFail(
                id,
                {
                    relations: [
                        EntitiesForRelationEnum.CREDITS,
                    ]
                }
            );
            return Promise.resolve(customer);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }

    async findOneByUsername(username: string): Promise<Customer>
    {
        try {
            const customerRepository = getRepository(Customer);
            const customer: Customer = await customerRepository.findOneOrFail({where: {username}});
            return Promise.resolve(customer);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }

    async save(customer: Customer): Promise<Customer>
    {
        try {
            const customerRepository     = getRepository(Customer);
            const saveCustomer: Customer = await customerRepository.save(customer);
            return Promise.resolve(saveCustomer);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }

    async update(customer: Customer): Promise<Customer>
    {
        try {
            const customerRepository       = getRepository(Customer);
            const updateCustomer: Customer = await customerRepository.save(customer);
            return Promise.resolve(updateCustomer);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }

    async updateIsActive(id: number, customer: Customer): Promise<void>
    {
        try {
            const customerRepository = getRepository(Customer);
            await customerRepository.update(id, {isActive: customer.isActive});
        }
        catch (error) {
            return Promise.reject(error);
        }
    }

    async updatePassword(id: number, customer: Customer): Promise<void>
    {
        try {
            const customerRepository = getRepository(Customer);
            await customerRepository.update(id, {password: customer.password});
        }
        catch (error) {
            return Promise.reject(error);
        }
    }

    async updateLastLogin(id: number, customer: Customer): Promise<void>
    {
        try {
            const customerRepository = getRepository(Customer);
            await customerRepository.update(id, {lastLogin: customer.lastLogin});
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
}
