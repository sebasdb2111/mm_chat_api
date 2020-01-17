import CustomerNotExistException from '../../shared/domain/exceptions/CustomerNotExistsException';
import {Customer}                from '../../customers/domain/entity/Customer';

export default class CustomerNotExistGuard
{
    private customerId: number;
    private customer: Customer;

    constructor(customerId: number, customer: Customer)
    {
        this.customerId = customerId;
        this.customer   = customer;
    }

    async run()
    {
        if (!this.customer) {
            throw new CustomerNotExistException(this.customerId);
        }
    }
}
