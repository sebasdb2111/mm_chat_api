import {ChatSessionMessage}            from '../domain/entity/ChatSessionMessage';
import ChatSessionMessageRepository    from '../domain/ChatSessionMessageRepository';

export default class ChatSessionConversationGet
{
    private repository: ChatSessionMessageRepository;

    constructor(repository: ChatSessionMessageRepository)
    {
        this.repository = repository;
    }

    async run(chatSessionMessageId: number): Promise<ChatSessionMessage[]>
    {
        const chatSessionMessage: ChatSessionMessage[] = await this.repository.findConversation(chatSessionMessageId);

		chatSessionMessage.forEach(message =>
		{
			delete message.psychic.password;
			delete message.psychic.email;
			delete message.psychic.updatedAt;

			if (null !== message.customer) {
				delete message.customer.password;
				delete message.customer.email;
				delete message.customer.updatedAt;
			}

			if (null !== message.user) {
				delete message.user.password;
				delete message.user.email;
				delete message.user.updatedAt;
            }
		});

        return Promise.resolve(chatSessionMessage);
    }
}
