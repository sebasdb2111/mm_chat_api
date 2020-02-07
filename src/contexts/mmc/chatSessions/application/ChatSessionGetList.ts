import {ChatSession} from '../domain/entity/ChatSession';
import ChatSessionRepository from '../domain/ChatSessionRepository';
// import ChatSessionConversationGet    from '../../chatSessionMessages/application/ChatSessionConversationGet';
// import {ChatSessionMessage}      from '../../chatSessionMessages/domain/entity/ChatSessionMessage';
// import {IChatSessionCoversation} from '../domain/interfaces/IChatSessionCoversation';
// import {IMessage}                from '../../shared/domain/interfaces/IMessage';

export default class ChatSessionGetList {
	private repository: ChatSessionRepository;

	constructor(repository: ChatSessionRepository) {
		this.repository = repository;
	}

	async run(chatSessionListDto: any): Promise<ChatSession[]> {
		try {
			const chatSessionList: ChatSession[] = await this.repository.findByOwnerOrPsychic(
				chatSessionListDto.ownerId, chatSessionListDto.psychicId
			);

			chatSessionList.forEach(chatSession =>
			{
				delete chatSession.psychic.password;
				delete chatSession.psychic.email;
				delete chatSession.psychic.updatedAt;

				if (null !== chatSession.owner) {
					delete chatSession.owner.password;
					delete chatSession.owner.email;
					delete chatSession.owner.updatedAt;
				}

				if (null !== chatSession.user) {
					delete chatSession.user.password;
					delete chatSession.user.email;
					delete chatSession.user.updatedAt;
				}
			});

			return Promise.resolve(chatSessionList);
		}
		catch (error) {
			return Promise.reject(error);
		}
	}
}
