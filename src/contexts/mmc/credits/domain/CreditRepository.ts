import {Credit} from './entity/Credit';

export default interface CreditRepository
{
    decrementCoinsByCreditId(creditId: number, quantity: number): Promise<void>

    findAndSumCreditsByCustomerAndPsychic(customerId: number, psychicId: number): Promise<any>

    findByCustomerAndPsychic(customerId: number, psychicId: number): Promise<Credit[]>

    findOneOrFail(id: number): Promise<Credit>;

    save(credit: Credit): Promise<Credit>;
}
