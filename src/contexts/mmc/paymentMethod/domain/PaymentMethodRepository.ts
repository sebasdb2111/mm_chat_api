import {PaymentMethod} from './entity/PaymentMethod';

export default interface PaymentMethodRepository
{
    findOneOrFail(id: number): Promise<PaymentMethod>;
}
