import {Offer}         from '../domain/entity/Offer';
import OfferRepository from '../domain/OfferRepository';

export default class OfferGet
{
    private repository: OfferRepository;

    constructor(repository: OfferRepository)
    {
        this.repository = repository;
    }

    async run(offerId: number): Promise<Offer>
    {
        try {
            const offer: Offer = await this.repository.findOneOrFail(offerId);

            return Promise.resolve(offer);
        }
        catch (error) {
            return Promise.reject(error)
        }
    }
}
