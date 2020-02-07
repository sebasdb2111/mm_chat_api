import {PsychicOffer} from './entity/PsychicOffer';

export default interface PsychicOfferRepository
{
    findOneOrFail(id: number): Promise<PsychicOffer>;
	findOneByOwnerAndPsychic(owner: number, psychic: number): Promise<PsychicOffer>;
    find(): Promise<PsychicOffer[]>;
}
