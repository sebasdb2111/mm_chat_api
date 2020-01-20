import * as jwt           from 'jsonwebtoken';
import config             from '../../../../../apps/mmc/config/config';
import CustomerRepository from '../../../customers/domain/CustomerRepository';
import {Customer}         from '../../../customers/domain/entity/Customer';
import AuthLoginDto       from '../../domain/dto/AuthLoginDto';

export default class AuthCustomerLogin
{
    private repository: CustomerRepository;

    constructor(repository: CustomerRepository)
    {
        this.repository = repository;
    }

    async run(authLoginDto: AuthLoginDto): Promise<string>
    {
        const customer: Customer = await this.repository.findOneByUsername(authLoginDto.username);

        customer.checkIfUnencryptedPasswordIsValid(authLoginDto.password);

        // TODO: meter la fecha actual
        // user.lastLogin = ;
        await this.repository.updateLastLogin(customer.id, customer);

        const customerToken: string = await this.createJwt(customer);

        return Promise.resolve(customerToken);
    }

    async createJwt(customer: Customer): Promise<string>
    {
        return jwt.sign(
            {
                customerId: customer.id,
                username  : customer.username,
                entityType: 'CUSTOMER'
            },
            config.jwtSecret,
            {expiresIn: '1h'}
        );
    }
}
