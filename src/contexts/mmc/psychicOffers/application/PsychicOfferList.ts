import {PsychicOffer}         from '../domain/entity/PsychicOffer';
import PsychicOfferRepository from '../domain/PsychicOfferRepository';

export default class PsychicOfferList
{
    private repository: PsychicOfferRepository;

    constructor(repository: PsychicOfferRepository)
    {
        this.repository = repository;
    }

    async run(): Promise<PsychicOffer[]>
    {
        try {
            const psychicOffers: PsychicOffer[] = await this.repository.find();
            psychicOffers.forEach(psychicOffer =>
			{
				delete psychicOffer.offer.updatedAt;
				delete psychicOffer.psychic.password;
				delete psychicOffer.psychic.email;
				delete psychicOffer.psychic.updatedAt;
			});
            return Promise.resolve(psychicOffers);
        }
        catch (error) {
            return Promise.reject(error)
        }
    }
}
