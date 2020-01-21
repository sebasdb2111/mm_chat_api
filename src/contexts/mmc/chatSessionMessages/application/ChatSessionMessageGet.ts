import {ChatSessionMessage}            from '../domain/entity/ChatSessionMessage';
import ChatSessionMessageRepository    from '../domain/ChatSessionMessageRepository';
import ChatSessionMessageNotExistGuard from '../../shared/application/ChatSessionMessageNotExistGuard';

export default class ChatSessionMessageGet
{
    private repository: ChatSessionMessageRepository;

    constructor(repository: ChatSessionMessageRepository)
    {
        this.repository = repository;
    }

    async run(chatSessionMessageId: number): Promise<ChatSessionMessage>
    {
        const chatSessionMessage: ChatSessionMessage = await this.repository.findOneOrFail(chatSessionMessageId);

        await new ChatSessionMessageNotExistGuard(chatSessionMessageId, chatSessionMessage);

        return Promise.resolve(chatSessionMessage);
    }
}
