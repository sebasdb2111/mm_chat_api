import {getRepository}           from 'typeorm';
import {Credit}                  from '../domain/entity/Credit';
import CreditRepository          from '../domain/CreditRepository';
import {EntitiesForRelationEnum} from '../../shared/domain/EntitiesForRelationEnum';

export default class TypeormCreditRepository implements CreditRepository
{
    async decrementCoinsByCreditId(creditId: number, quantity: number): Promise<void>
    {
        try {
            const creditRepository = getRepository(Credit);
            await creditRepository.decrement({id: creditId}, 'coins', quantity);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }

    async findAndSumCreditsByCustomerAndPsychic(customerId: number, psychicId: number): Promise<any>
    {
        try {
            const creditRepository = getRepository(Credit);
            const sumCredits: any  = await creditRepository
                .createQueryBuilder('credit')
                .select("SUM(credit.coins)", "totalCoins")
                .leftJoinAndSelect('credit.customer', 'customer')
                .leftJoinAndSelect('credit.psychic', 'psychic')
                .where('customer.id = :valueCustomer', {valueCustomer: customerId})
                .andWhere('psychic.id = :valuePsychic', {valuePsychic: psychicId})
                .getRawOne();

            return Promise.resolve(sumCredits);
        }
        catch (error) {
            return Promise.reject(error)
        }
    }

    async findByCustomerAndPsychic(customerId: number, psychicId: number): Promise<Credit[]>
    {
        try {
            const creditRepository = getRepository(Credit);
            const credit: Credit[] = await creditRepository.find(
                {
                    where    : {customerId, psychicId},
                    relations: [
                        EntitiesForRelationEnum.CUSTOMER,
                        EntitiesForRelationEnum.PSYCHIC,
                    ]
                }
            );
            return Promise.resolve(credit);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }

    async findOneOrFail(id: number): Promise<Credit>
    {
        try {
            const creditRepository = getRepository(Credit);
            const credit: Credit   = await creditRepository.findOneOrFail(
                id,
                {
                    relations: [
                        EntitiesForRelationEnum.CUSTOMER,
                        EntitiesForRelationEnum.PSYCHIC,
                    ]
                }
            );
            return Promise.resolve(credit);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }

    async save(credit: Credit): Promise<Credit>
    {
        try {
            const creditRepository   = getRepository(Credit);
            const saveCredit: Credit = await creditRepository.save(credit);
            return Promise.resolve(saveCredit);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
}
