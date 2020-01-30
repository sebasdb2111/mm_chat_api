import * as jwt           from 'jsonwebtoken';
import config             from '../../../../../apps/mmc/config/config';
import CustomerRepository from '../../../customers/domain/CustomerRepository';
import {Customer}         from '../../../customers/domain/entity/Customer';
import AuthLoginDto       from '../../domain/dto/AuthLoginDto';
import {AuthEntitiesEnum} from '../../../../shared/domain/AuthEntitiesEnum';

export default class AuthCustomerLogin
{
    private repository: CustomerRepository;

    constructor(repository: CustomerRepository)
    {
        this.repository = repository;
    }

    async run(authLoginDto: AuthLoginDto): Promise<string>
    {
    	try {
			const customer: Customer = await this.repository.findOneByEmail(authLoginDto.email);

			customer.checkIfUnencryptedPasswordIsValid(authLoginDto.password);
			customer.updateLastLogin();

			await this.repository.updateLastLogin(customer.id, customer);

			const customerToken: string = await this.createJwt(customer);

			return Promise.resolve(customerToken);
		}
		catch (error) {
			return Promise.reject(error);
		}
    }

    async createJwt(customer: Customer): Promise<string>
    {
        return jwt.sign(
            {
                customerId: customer.id,
                username  : customer.username,
                entityType: AuthEntitiesEnum.CUSTOMER
            },
            config.jwtSecret,
            {expiresIn: '1h'}
        );
    }
}
