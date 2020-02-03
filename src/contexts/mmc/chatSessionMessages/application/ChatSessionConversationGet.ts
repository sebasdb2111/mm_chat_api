import {ChatSessionMessage}            from '../domain/entity/ChatSessionMessage';
import ChatSessionMessageRepository    from '../domain/ChatSessionMessageRepository';

export default class ChatSessionConversationGet
{
    private repository: ChatSessionMessageRepository;

    constructor(repository: ChatSessionMessageRepository)
    {
        this.repository = repository;
    }

    async run(chatSessionMessageId: number): Promise<ChatSessionMessage[]>
    {
        const chatSessionMessage: ChatSessionMessage[] = await this.repository.findConversation(chatSessionMessageId);

        return Promise.resolve(chatSessionMessage);
    }
}
