import {ChatSessionMessage}            from '../domain/entity/ChatSessionMessage';
import ChatSessionMessageRepository    from '../domain/ChatSessionMessageRepository';
import ChatSessionDeletedDto from '../domain/dto/ChatSessionDeletedDto';
import ChatSessionMessageNotExistGuard from '../../shared/application/ChatSessionMessageNotExistGuard';

export default class ChatSessionMessageDelete
{
    private repository: ChatSessionMessageRepository;

    constructor(repository: ChatSessionMessageRepository)
    {
        this.repository = repository;
    }

    async run(chatSessionDeactivateDto: ChatSessionDeletedDto): Promise<void>
    {
        const chatSession: ChatSessionMessage = await this.repository.findOneOrFail(chatSessionDeactivateDto.id);
        chatSession.deleted    = chatSessionDeactivateDto.deleted;

        await new ChatSessionMessageNotExistGuard(chatSessionDeactivateDto.id, chatSession);

        const chatSessionDeactivated = await this.repository.updateDeleted(chatSessionDeactivateDto.id, chatSession);

        return Promise.resolve(chatSessionDeactivated);
    }
}
