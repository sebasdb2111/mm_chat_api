export default class ChatSessionMessageNotExistsException extends Error
{
    constructor(chatSessionMessageId: number)
    {
        super(`The chat session message with id: ${chatSessionMessageId} not exists`);
    }
}
