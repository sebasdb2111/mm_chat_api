import {ChatSession} from './entity/ChatSession';

export default interface ChatSessionRepository
{
    find(ownerId: number): Promise<ChatSession[]>;

    findOneOrFail(id: number): Promise<ChatSession>;

    save(chatSession: ChatSession): Promise<ChatSession>;

    updateIsActive(id: number, chatSession: ChatSession): Promise<void>;
}
