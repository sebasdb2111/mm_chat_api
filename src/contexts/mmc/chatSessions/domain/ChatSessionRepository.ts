import {ChatSession} from './entity/ChatSession';

export default interface ChatSessionRepository
{
    findOneOrFail(id: number): Promise<ChatSession>;

    save(chatSession: ChatSession): Promise<ChatSession>;

    updateIsActive(id: number, chatSession: ChatSession): Promise<void>;
}
