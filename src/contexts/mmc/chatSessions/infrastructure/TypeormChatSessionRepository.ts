import {getRepository}           from 'typeorm';
import {ChatSession}             from '../domain/entity/ChatSession';
import ChatSessionRepository     from '../domain/ChatSessionRepository';
import {EntitiesForRelationEnum} from "../../shared/domain/EntitiesForRelationEnum";

export default class TypeormChatSessionRepository implements ChatSessionRepository
{
    async findOneOrFail(id: number): Promise<ChatSession>
    {
        const chatSessionRepository    = getRepository(ChatSession);
        const chatSession: ChatSession = await chatSessionRepository.findOneOrFail(
            id,
            {
                relations: [
                    EntitiesForRelationEnum.OWNER,
                    EntitiesForRelationEnum.PSYCHIC,
                    EntitiesForRelationEnum.USER
                ]
            }
        );
        return Promise.resolve(chatSession);
    }

    async save(chatSession: ChatSession): Promise<ChatSession>
    {
        const chatSessionRepository        = getRepository(ChatSession);
        const saveChatSession: ChatSession = await chatSessionRepository.save(chatSession);
        return Promise.resolve(saveChatSession);
    }

    async updateIsActive(id: number, chatSession: ChatSession): Promise<void>
    {
        const chatSessionRepository = getRepository(ChatSession);
        await chatSessionRepository.update(id, {isActive: chatSession.isActive});
    }
}
