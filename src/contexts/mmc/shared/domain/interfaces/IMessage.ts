import {IParticipant} from './IParticipant';

export interface IMessage
{
    id: number,
    message: string,
    deleted: boolean,
    createdAt: Date,
    customer?: IParticipant
    psychic?: IParticipant
    user?: IParticipant
}