import {Offer} from './entity/Offer';

export default interface OfferRepository
{
    findOneOrFail(id: number): Promise<Offer>;
}
