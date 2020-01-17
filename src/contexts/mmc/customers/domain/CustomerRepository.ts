import {Customer} from './entity/Customer';

export default interface CustomerRepository
{
    findOneOrFail(id: number): Promise<Customer>;

    findOneByUsername(username: string): Promise<Customer>;

    save(customer: Customer): Promise<Customer>;

    update(customer: Customer): Promise<Customer>;

    updateIsActive(id: number, customer: Customer): Promise<void>;

    updatePassword(id: number, customer: Customer): Promise<void>;

    updateLastLogin(id: number, customer: Customer): Promise<void>;
}
