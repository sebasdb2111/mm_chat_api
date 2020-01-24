import {getRepository}         from 'typeorm';
import {PaymentMethod}         from '../domain/entity/PaymentMethod';
import PaymentMethodRepository from '../domain/PaymentMethodRepository';

export default class TypeormPaymentMethodRepository implements PaymentMethodRepository
{
    async findOneOrFail(id: number): Promise<PaymentMethod>
    {
        const paymentMethodRepository      = getRepository(PaymentMethod);
        const paymentMethod: PaymentMethod = await paymentMethodRepository.findOneOrFail(id);
        return Promise.resolve(paymentMethod);
    }
}