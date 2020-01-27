import {getRepository}       from 'typeorm';
import {Transaction}         from '../domain/entity/Transaction';
import TransactionRepository from '../domain/TransactionRepository';

export default class TypeormTransactionRepository implements TransactionRepository
{

    async findOneOrFail(id: number): Promise<Transaction>
    {
        const transactionRepository        = getRepository(Transaction);
        const transaction: Transaction = await transactionRepository.findOneOrFail(id);

        return Promise.resolve(transaction);
    }

    async save(transaction: Transaction): Promise<Transaction>
    {
        const transactionRepository        = getRepository(Transaction);
        const transactionSave: Transaction = await transactionRepository.save(transaction);

        return Promise.resolve(transactionSave);
    }
}