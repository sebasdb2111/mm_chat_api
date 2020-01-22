export default class ChatSessionMessageCreateDto
{
    public chatSessionId: number;
    public message: string;
    public customerId: number;
    public psychicId: number;
    public userId: number;

    constructor(
        chatSessionId: number,
        message: string,
        customerId: number,
        psychicId: number,
        userId?: number
    )
    {
        this.chatSessionId = chatSessionId;
        this.message       = message;
        this.customerId    = customerId;
        this.psychicId     = psychicId;
        this.userId        = userId;
    }
}
