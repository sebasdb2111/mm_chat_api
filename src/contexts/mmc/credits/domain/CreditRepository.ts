import {Credit} from './entity/Credit';

export default interface CreditRepository
{
    findOneOrFail(id: number): Promise<Credit>;

    save(credit: Credit): Promise<Credit>;
}
