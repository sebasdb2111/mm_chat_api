import {Transaction} from './entity/Transaction';

export default interface TransactionRepository
{
    findOneOrFail(id: number): Promise<Transaction>;
    save(transaction: Transaction): Promise<Transaction>;
}
