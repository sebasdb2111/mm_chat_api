import ChatSessionNotExistException from '../../shared/domain/exceptions/ChatSessionNotExistsException';
import {ChatSessionMessage}         from '../../chatSessionMessages/domain/entity/ChatSessionMessage';

export default class ChatSessionMessageNotExistGuard
{
    private chatSessionMessageId: number;
    private chatSessionMessage: ChatSessionMessage;

    constructor(chatSessionMessageId: number, chatSessionMessage: ChatSessionMessage)
    {
        this.chatSessionMessageId = chatSessionMessageId;
        this.chatSessionMessage   = chatSessionMessage;
    }

    async run()
    {
        if (!this.chatSessionMessage) {
            throw new ChatSessionNotExistException(this.chatSessionMessageId);
        }
    }
}
