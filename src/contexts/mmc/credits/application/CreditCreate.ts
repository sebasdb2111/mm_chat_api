import {Credit}         from '../domain/entity/Credit';
import CreditRepository from '../domain/CreditRepository';
import CreditCreateDto  from '../domain/dto/CreditCreateDto';
import {Psychic}        from '../../psychics/domain/entity/Psychic';
import {Customer}       from '../../customers/domain/entity/Customer';
import CustomerGet      from '../../customers/application/CustomerGet';
import PsychicGet       from '../../psychics/application/PsychicGet';
import {Transaction}    from "../../transactions/domain/entity/Transaction";
import TransactionGet   from '../../transactions/application/TransactionGet';

export default class CreditCreate
{
    private repository: CreditRepository;

    private customerGet: CustomerGet;
    private psychicGet: PsychicGet;
    private transactionGet: TransactionGet;

    constructor(
        repository: CreditRepository,
        customerGet: CustomerGet,
        psychicGet: PsychicGet,
        transactionGet: TransactionGet,
    )
    {
        this.repository     = repository;
        this.customerGet    = customerGet;
        this.psychicGet     = psychicGet;
        this.transactionGet = transactionGet;
    }

    async run(creditDto: CreditCreateDto): Promise<Credit>
    {
        try {
            const customer: Customer       = await this.customerGet.run(creditDto.customerId);
            const psychic: Psychic         = await this.psychicGet.run(creditDto.psychicId);
            const transaction: Transaction = await this.transactionGet.run(creditDto.psychicId);

            const credit: Credit = new Credit();
            credit.time          = null !== creditDto.time ? creditDto.time : null;
            credit.coins         = null !== creditDto.coins ? creditDto.coins : null;
            credit.customer      = customer;
            credit.psychic       = psychic;
            credit.transaction   = transaction;

            const newCredit: Credit = await this.repository.save(credit);

            return Promise.resolve(newCredit);
        }
        catch (error) {
            return Promise.reject(error)
        }
    }
}
