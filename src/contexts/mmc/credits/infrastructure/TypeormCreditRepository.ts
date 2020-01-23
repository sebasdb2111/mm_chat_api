import {getRepository}           from 'typeorm';
import {Credit}                  from '../domain/entity/Credit';
import CreditRepository          from '../domain/CreditRepository';
import {EntitiesForRelationEnum} from '../../shared/domain/EntitiesForRelationEnum';

export default class TypeormCreditRepository implements CreditRepository
{
    async findOneOrFail(id: number): Promise<Credit>
    {
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

    async save(credit: Credit): Promise<Credit>
    {
        const creditRepository   = getRepository(Credit);
        const saveCredit: Credit = await creditRepository.save(credit);
        return Promise.resolve(saveCredit);
    }
}
