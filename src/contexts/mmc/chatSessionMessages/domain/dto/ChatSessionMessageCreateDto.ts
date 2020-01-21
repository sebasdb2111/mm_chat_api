export default class ChatSessionMessageCreateDto
{
    public message: string;
    public customerId: number;
    public psychicId: number;
    public userId: number;

    constructor(
        message: string,
        customerId: number,
        psychicId: number,
        userId?: number
    )
    {
        this.message    = message;
        this.customerId = customerId;
        this.psychicId  = psychicId;
        this.userId     = userId;
    }
}
