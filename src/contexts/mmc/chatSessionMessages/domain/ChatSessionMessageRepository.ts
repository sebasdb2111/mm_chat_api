import {ChatSessionMessage} from './entity/ChatSessionMessage';

export default interface ChatSessionMessageRepository
{
    findOneOrFail(id: number): Promise<ChatSessionMessage>;

    save(chatSession: ChatSessionMessage): Promise<ChatSessionMessage>;

    updateDeleted(id: number, chatSessionMessage: ChatSessionMessage): Promise<void>;
}
