export default class ChatSessionNotExistsException extends Error
{
    constructor(chatSessionId: number)
    {
        super(`The chat session with id: ${chatSessionId} not exists`);
    }
}
