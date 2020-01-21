import {ChatSession}            from '../domain/entity/ChatSession';
import ChatSessionRepository    from '../domain/ChatSessionRepository';
import ChatSessionNotExistGuard from '../../shared/application/ChatSessionNotExistGuard';

export default class ChatSessionGet
{
    private repository: ChatSessionRepository;

    constructor(repository: ChatSessionRepository)
    {
        this.repository = repository;
    }

    async run(chatSessionId: number): Promise<ChatSession>
    {
        const chatSession: ChatSession = await this.repository.findOneOrFail(chatSessionId);

        await new ChatSessionNotExistGuard(chatSessionId, chatSession);

        return Promise.resolve(chatSession);
    }
}
