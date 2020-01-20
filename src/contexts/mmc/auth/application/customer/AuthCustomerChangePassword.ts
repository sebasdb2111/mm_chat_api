import CustomerRepository    from '../../../customers/domain/CustomerRepository';
import {Customer}            from '../../../customers/domain/entity/Customer';
import AuthChangePasswordDto from '../../domain/dto/AuthChangePasswordDto';

export default class AuthCustomerChangePassword
{
    private repository: CustomerRepository;

    constructor(repository: CustomerRepository)
    {
        this.repository = repository;
    }

    async run(authChangePasswordDto: AuthChangePasswordDto): Promise<void>
    {
        const customer: Customer = await this.repository.findOneByUsername(authChangePasswordDto.username);
        customer.password        = authChangePasswordDto.password;

        customer.hashPassword();

        const passwordChanged: void = await this.repository.updatePassword(customer.id, customer);

        return Promise.resolve(passwordChanged);
    }
}
