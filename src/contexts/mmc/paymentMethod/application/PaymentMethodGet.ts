import {PaymentMethod}         from '../domain/entity/PaymentMethod';
import PaymentMethodRepository from '../domain/PaymentMethodRepository';

export default class PaymentMethodGet
{
    private repository: PaymentMethodRepository;

    constructor(repository: PaymentMethodRepository)
    {
        this.repository = repository;
    }

    async run(paymentMethodId: number): Promise<PaymentMethod>
    {
        try {
            const paymentMethod: PaymentMethod = await this.repository.findOneOrFail(paymentMethodId);

            return Promise.resolve(paymentMethod);
        }
        catch (error) {
            return Promise.reject(error)
        }
    }
}
