import {PsychicOffer}         from '../domain/entity/PsychicOffer';
import PsychicOfferRepository from '../domain/PsychicOfferRepository';

export default class PsychicOfferGet
{
    private repository: PsychicOfferRepository;

    constructor(repository: PsychicOfferRepository)
    {
        this.repository = repository;
    }

    async run(ownerId: number, psychicId: number): Promise<PsychicOffer>
    {
        try {
            const psychicOffer: PsychicOffer = await this.repository.findOneByOwnerAndPsychic(ownerId, psychicId);

            return Promise.resolve(psychicOffer);
        }
        catch (error) {
            return Promise.reject(error)
        }
    }
}
