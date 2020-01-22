import ChatSessionNotExistException from '../../shared/domain/exceptions/ChatSessionNotExistsException';
import {ChatSession}                from '../../chatSessions/domain/entity/ChatSession';

export default class ChatSessionNotExistGuard
{
    private chatSessionId: number;
    private chatSession: ChatSession;

    constructor(chatSessionId: number, chatSession: ChatSession)
    {
        this.chatSessionId = chatSessionId;
        this.chatSession   = chatSession;
    }

    async run()
    {
        if (!this.chatSession) {
            throw new ChatSessionNotExistException(this.chatSessionId);
        }
    }
}
