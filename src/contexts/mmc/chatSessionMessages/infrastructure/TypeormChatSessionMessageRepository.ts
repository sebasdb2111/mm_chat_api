import {getRepository}              from 'typeorm';
import ChatSessionMessageRepository from '../domain/ChatSessionMessageRepository';
import {ChatSessionMessage}         from '../domain/entity/ChatSessionMessage';
import {EntitiesForRelationEnum}    from '../../shared/domain/EntitiesForRelationEnum';

export default class TypeormChatSessionMessageRepository implements ChatSessionMessageRepository
{
    async findOneOrFail(id: number): Promise<ChatSessionMessage>
    {
        try{
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
        catch (error) {
            return Promise.reject(error);
        }
    }

    async findConversation(id: number): Promise<ChatSessionMessage[]>
    {
        try {
			const chatSessionMessageRepository = getRepository(ChatSessionMessage);
			const chatSessionMessage: any      = await chatSessionMessageRepository
				.createQueryBuilder('conversation')
				.leftJoinAndSelect('conversation.chatSession', 'chatSession')
				.leftJoinAndSelect('conversation.customer', 'customer')
				.leftJoinAndSelect('conversation.psychic', 'psychic')
				.leftJoinAndSelect('conversation.user', 'user')
				.where('chatSessionId = :chatSession', {chatSession: id})
				.orderBy('conversation.id', 'ASC')
				.getMany();

			return Promise.resolve(chatSessionMessage);
        }
        catch (error) {
			return Promise.reject(error);
		}

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
        try {
			const chatSessionMessageRepository = getRepository(ChatSessionMessage);
			await chatSessionMessageRepository.update(id, {deleted: chatSessionMessage.deleted});
		}
		catch (error) {
            return Promise.reject(error)
		}
    }
}
