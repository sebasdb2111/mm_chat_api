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

			return Promise.resolve(chatSessionList);
		}
		catch (error) {
			return Promise.reject(error);
		}
	}
}
