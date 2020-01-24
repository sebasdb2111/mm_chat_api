import {getRepository}           from 'typeorm';
import {PsychicOffer}            from '../domain/entity/PsychicOffer';
import PsychicOfferRepository    from '../domain/PsychicOfferRepository';
import {EntitiesForRelationEnum} from '../../shared/domain/EntitiesForRelationEnum';

export default class TypeormPsychicOfferRepository implements PsychicOfferRepository
{
    async findOneOrFail(id: number): Promise<PsychicOffer>
    {
        const psychicOfferRepository     = getRepository(PsychicOffer);
        const psychicOffer: PsychicOffer = await psychicOfferRepository.findOneOrFail(
            id,
            {
                relations: [
                    EntitiesForRelationEnum.OFFER,
                    EntitiesForRelationEnum.PSYCHIC,
                ]
            }
        );

        return Promise.resolve(psychicOffer);
    }
}
