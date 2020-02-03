import {ChatSession}             from '../domain/entity/ChatSession';
import ChatSessionRepository     from '../domain/ChatSessionRepository';
import ChatSessionNotExistGuard  from '../../shared/application/ChatSessionNotExistGuard';
import ChatSessionConversationGet    from '../../chatSessionMessages/application/ChatSessionConversationGet';
import {ChatSessionMessage}      from '../../chatSessionMessages/domain/entity/ChatSessionMessage';
import {IChatSessionCoversation} from '../domain/interfaces/IChatSessionCoversation';
import {IMessage}                from '../../shared/domain/interfaces/IMessage';

export default class ChatSessionConversationGet
{
    private repository: ChatSessionRepository;
    private chatSessionMessageList: ChatSessionConversationGet;

    constructor(repository: ChatSessionRepository, chatSessionMessageList: ChatSessionConversationGet)
    {
        this.repository             = repository;
        this.chatSessionMessageList = chatSessionMessageList;
    }

    async run(chatSessionId: number): Promise<IChatSessionCoversation>
    {
        const chatSession: ChatSession                     = await this.repository.findOneOrFail(chatSessionId);
        const chatSessionMessageList: ChatSessionMessage[] = await this.chatSessionMessageList.run(chatSessionId);
        const chatSessionConversation: IChatSessionCoversation = await this.cleanResponse(chatSession, chatSessionMessageList);

        await new ChatSessionNotExistGuard(chatSessionId, chatSession);

        return Promise.resolve(chatSessionConversation);
    }

    async cleanResponse(chatSession: ChatSession, chatSessionMessageList: ChatSessionMessage[]): Promise<IChatSessionCoversation>
    {
        let messages: IMessage[] = [];
        chatSessionMessageList.forEach(message =>
        {
            messages.push({
                id       : message.id,
                message  : message.message,
                deleted  : message.deleted,
                createdAt: message.createdAt,
                customer : null !== message.customer ? {id: message.customer.id, username: message.customer.username} : null,
                psychic  : null !== message.psychic ? {id: message.psychic.id, username: message.psychic.username} : null,
                user     : null !== message.user ? {id: message.user.id, username: message.user.username} : null
            })
        });

        const conversation: IChatSessionCoversation = {
            id                 : chatSession.id,
            isActive           : chatSession.isActive,
            createdAt          : chatSession.createdAt,
            updatedAt          : chatSession.updatedAt,
            chatSessionMessages: messages,
            owner              : {id: chatSession.owner.id, username: chatSession.owner.username},
            psychic            : null !== chatSession.psychic ? {id: chatSession.psychic.id, username: chatSession.psychic.username} : null,
            user               : null !== chatSession.user ? {id: chatSession.user.id, username: chatSession.user.username} : null
        };

        return conversation;
    }
}
