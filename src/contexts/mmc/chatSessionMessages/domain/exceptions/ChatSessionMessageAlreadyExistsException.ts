export default class ChatSessionMessageNotExistsException extends Error
{
    constructor(chatSessionMessageId: number)
    {
        super(`The message with id: ${chatSessionMessageId} not exists`);
    }
}
