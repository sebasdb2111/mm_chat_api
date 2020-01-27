import {IParticipant} from '../../../shared/domain/interfaces/IParticipant';

export interface IFindAndSumCreditsByCustomerAndPsychic
{
    customer: IParticipant,
    psychic: IParticipant,
    availableTime?: number,
    availableCoins?: number,
}