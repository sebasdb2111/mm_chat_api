import {PsychicOffer} from './entity/PsychicOffer';

export default interface PsychicOfferRepository
{
    findOneOrFail(id: number): Promise<PsychicOffer>;
    find(): Promise<PsychicOffer[]>;
}
