import {getRepository} from 'typeorm';
import {Offer}         from '../domain/entity/Offer';
import OfferRepository from '../domain/OfferRepository';

export default class TypeormOfferRepository implements OfferRepository
{
    async findOneOrFail(id: number): Promise<Offer>
    {
        const offerRepository = getRepository(Offer);
        const offer: Offer    = await offerRepository.findOneOrFail(id);
        return Promise.resolve(offer);
    }
}
