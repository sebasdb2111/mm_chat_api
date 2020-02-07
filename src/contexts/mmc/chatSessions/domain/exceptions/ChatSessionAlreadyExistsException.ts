export default class ChatSessionAlreadyExistsException extends Error
{
    constructor(psychicId: number)
    {
        super(`There is already a chat with the psychic ${psychicId}`);
    }
}
