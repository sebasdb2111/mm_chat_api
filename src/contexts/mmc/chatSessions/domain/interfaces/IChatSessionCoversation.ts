import {IMessage}     from '../../../shared/domain/interfaces/IMessage';
import {IParticipant} from '../../../shared/domain/interfaces/IParticipant';

export interface IChatSessionCoversation
{
    id: number,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date,
    chatSessionMessages: IMessage[]
    owner: IParticipant
    psychic?: IParticipant
    user?: IParticipant
}