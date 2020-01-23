import {Credit}         from '../domain/entity/Credit';
import CreditRepository from '../domain/CreditRepository';
import CreditCreateDto  from '../domain/dto/CreditCreateDto';
import {Psychic}        from '../../psychics/domain/entity/Psychic';
import {Customer}       from '../../customers/domain/entity/Customer';
import CustomerGet      from '../../customers/application/CustomerGet';
import PsychicGet       from '../../psychics/application/PsychicGet';

export default class CreditCreate
{
    private repository: CreditRepository;
    private customerGet: CustomerGet;
    private psychicGet: PsychicGet;

    constructor(
        repository: CreditRepository,
        customerGet: CustomerGet,
        psychicGet: PsychicGet,
    )
    {
        this.repository  = repository;
        this.customerGet = customerGet;
        this.psychicGet  = psychicGet;
    }

    async run(creditDto: CreditCreateDto): Promise<Credit>
    {
        try {
            const customer: Customer = await this.customerGet.run(creditDto.customerId);
            const psychic: Psychic   = await this.psychicGet.run(creditDto.psychicId);

            const credit: Credit = new Credit();
            credit.time          = null;
            credit.coins         = creditDto.coins;
            credit.customer      = customer;
            credit.psychic       = psychic;

            const newCredit: Credit = await this.repository.save(credit);

            return Promise.resolve(newCredit);
        }
        catch (error) {
            return Promise.reject(error)
        }
    }
}
