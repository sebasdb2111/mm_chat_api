import {Transaction}            from '../domain/entity/Transaction';
import TransactionRepository    from '../domain/TransactionRepository';

export default class TransactionGet
{
    private repository: TransactionRepository;

    constructor(repository: TransactionRepository)
    {
        this.repository = repository;
    }

    async run(transactionId: number): Promise<Transaction>
    {
        try {
            const transaction: Transaction = await this.repository.findOneOrFail(transactionId);


            return Promise.resolve(transaction);
        }
        catch (error) {
            return Promise.reject(error)
        }

    }
}
