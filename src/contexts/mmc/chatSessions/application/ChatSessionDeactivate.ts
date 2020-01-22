import {ChatSession}            from '../domain/entity/ChatSession';
import ChatSessionRepository    from '../domain/ChatSessionRepository';
import ChatSessionDeactivateDto from '../domain/dto/ChatSessionDeactivateDto';
import ChatSessionNotExistGuard from '../../shared/application/ChatSessionNotExistGuard';

export default class ChatSessionDeactivate
{
    private repository: ChatSessionRepository;

    constructor(repository: ChatSessionRepository)
    {
        this.repository = repository;
    }

    async run(chatSessionDeactivateDto: ChatSessionDeactivateDto): Promise<void>
    {
        const chatSession: ChatSession = await this.repository.findOneOrFail(chatSessionDeactivateDto.id);
        chatSession.isActive           = chatSessionDeactivateDto.isActive;

        await new ChatSessionNotExistGuard(chatSessionDeactivateDto.id, chatSession);

        const chatSessionDeactivated = await this.repository.updateIsActive(chatSessionDeactivateDto.id, chatSession);

        return Promise.resolve(chatSessionDeactivated);
    }
}
