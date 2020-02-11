export default class ChatSessionMessageCreateDto
{
    public chatSessionId: number;
    public message: string;
    public isImage: boolean;
    public customerId: number;
    public psychicId: number;
    public userId: number;

    constructor(
        chatSessionId: number,
        message: string,
        isImage: boolean,
        customerId: number,
        psychicId: number,
        userId?: number
    )
    {
        this.chatSessionId = chatSessionId;
        this.message       = message;
        this.isImage       = isImage;
        this.customerId    = customerId;
        this.psychicId     = psychicId;
        this.userId        = userId;
    }
}
