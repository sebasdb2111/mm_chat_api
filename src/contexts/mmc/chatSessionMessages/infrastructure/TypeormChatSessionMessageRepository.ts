import {getRepository}              from 'typeorm';
import ChatSessionMessageRepository from '../domain/ChatSessionMessageRepository';
import {ChatSessionMessage}         from '../domain/entity/ChatSessionMessage';
import {EntitiesForRelationEnum}    from '../../shared/domain/EntitiesForRelationEnum';

export default class TypeormChatSessionMessageRepository implements ChatSessionMessageRepository
{
    async findOneOrFail(id: number): Promise<ChatSessionMessage>
    {
        const chatSessionMessageRepository           = getRepository(ChatSessionMessage);
        const chatSessionMessage: ChatSessionMessage = await chatSessionMessageRepository.findOneOrFail(
            id,
            {
                relations: [
                    EntitiesForRelationEnum.CHATSESSION,
                    EntitiesForRelationEnum.CUSTOMER,
                    EntitiesForRelationEnum.PSYCHIC,
                    EntitiesForRelationEnum.USER
                ]
            });
        return Promise.resolve(chatSessionMessage);
    }

    async findConversation(id: number): Promise<ChatSessionMessage[]>
    {
        const chatSessionMessageRepository             = getRepository(ChatSessionMessage);
        const chatSessionMessage: ChatSessionMessage[] = await chatSessionMessageRepository.find(
            {
                relations: [
                    EntitiesForRelationEnum.CHATSESSION,
                    EntitiesForRelationEnum.CUSTOMER,
                    EntitiesForRelationEnum.PSYCHIC,
                    EntitiesForRelationEnum.USER
                ],
                where    : {chatSessionId: id},
                order    : {id: 'ASC'}
            });
        return Promise.resolve(chatSessionMessage);
    }

    async save(chatSessionMessage: ChatSessionMessage): Promise<ChatSessionMessage>
    {
        try {
            const chatSessionMessageRepository               = getRepository(ChatSessionMessage);
            const saveChatSessionMessage: ChatSessionMessage = await chatSessionMessageRepository.save(chatSessionMessage);
            return Promise.resolve(saveChatSessionMessage);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }

    async updateDeleted(id: number, chatSessionMessage: ChatSessionMessage): Promise<void>
    {
        const chatSessionMessageRepository = getRepository(ChatSessionMessage);
        await chatSessionMessageRepository.update(id, {deleted: chatSessionMessage.deleted});
    }
}
