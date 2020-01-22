export default class ChatSessionCreateDto
{
    public ownerId: number;
    public psychicId: number;
    public userId: number;

    constructor(
        ownerId: number,
        psychicId: number,
        userId?: number
    )
    {
        this.ownerId   = ownerId;
        this.psychicId = psychicId;
        this.userId    = userId;
    }
}
