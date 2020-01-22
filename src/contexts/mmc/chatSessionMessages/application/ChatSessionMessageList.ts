import {ChatSessionMessage}            from '../domain/entity/ChatSessionMessage';
import ChatSessionMessageRepository    from '../domain/ChatSessionMessageRepository';
// import ChatSessionMessageNotExistGuard from '../../shared/application/ChatSessionMessageNotExistGuard';

export default class ChatSessionMessageList
{
    private repository: ChatSessionMessageRepository;

    constructor(repository: ChatSessionMessageRepository)
    {
        this.repository = repository;
    }

    async run(chatSessionMessageId: number): Promise<ChatSessionMessage[]>
    {
        const chatSessionMessage: ChatSessionMessage[] = await this.repository.findConversation(chatSessionMessageId);

        // await new ChatSessionMessageNotExistGuard(chatSessionMessageId, chatSessionMessage);

        return Promise.resolve(chatSessionMessage);
    }
}
