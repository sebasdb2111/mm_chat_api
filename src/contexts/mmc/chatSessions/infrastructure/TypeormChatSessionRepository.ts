import {getRepository}             from 'typeorm';
import {ChatSession}               from '../domain/entity/ChatSession';
import ChatSessionRepository       from '../domain/ChatSessionRepository';
import {EntitiesForRelationEnum}   from '../../shared/domain/EntitiesForRelationEnum';
import {Credit} from '../../credits/domain/entity/Credit';

export default class TypeormChatSessionRepository implements ChatSessionRepository
{
	async find(ownerId: number): Promise<ChatSession[]>
	{
		try {
			const chatSessionRepository    = getRepository(ChatSession);
			const chatSession: ChatSession[] = await chatSessionRepository.find(
				{
					where: { ownerId },
					relations: [
						EntitiesForRelationEnum.CHATSESSIONMESSAGES,
						EntitiesForRelationEnum.OWNER,
						EntitiesForRelationEnum.PSYCHIC,
						EntitiesForRelationEnum.USER
					]
				}
			);
			return Promise.resolve(chatSession);
		}
		catch (error) {
			return Promise.reject(error)
		}
	}

    async findOneOrFail(id: number): Promise<ChatSession>
    {
        try {
            const chatSessionRepository    = getRepository(ChatSession);
            const chatSession: ChatSession = await chatSessionRepository.findOneOrFail(
                id,
                {
                    relations: [
                        EntitiesForRelationEnum.CHATSESSIONMESSAGES,
                        EntitiesForRelationEnum.OWNER,
                        EntitiesForRelationEnum.PSYCHIC,
                        EntitiesForRelationEnum.USER
                    ]
                }
            );
            return Promise.resolve(chatSession);
        }
        catch (error) {
            return Promise.reject(error)
        }
    }

    async findByCustomerAndPsychic(ownerId: number, psychicId: number): Promise<ChatSession>
    {
        try {
            const chatSessionRepository = getRepository(ChatSession);
			const chatSession: ChatSession		= await chatSessionRepository
				.createQueryBuilder('chatSession')
				.where('ownerId = :owner', {owner: ownerId})
				.andWhere('psychicId = :psychic', {psychic: psychicId})
				.getOne();

            return Promise.resolve(chatSession);
        }
        catch (error) {
            return Promise.reject(error)
        }
    }

    async save(chatSession: ChatSession): Promise<ChatSession>
    {
        try {
            const chatSessionRepository        = getRepository(ChatSession);
            const saveChatSession: ChatSession = await chatSessionRepository.save(chatSession);
            return Promise.resolve(saveChatSession);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }

    async updateIsActive(id: number, chatSession: ChatSession): Promise<void>
    {
        try {
            const chatSessionRepository = getRepository(ChatSession);
            await chatSessionRepository.update(id, {isActive: chatSession.isActive});
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
}
