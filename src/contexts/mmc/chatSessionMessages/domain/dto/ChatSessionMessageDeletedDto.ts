export default class ChatSessionDeletedDto
{
    public id: number;
    public deleted: boolean;

    constructor(
        id: number,
        deleted: boolean,
    )
    {
        this.id      = id;
        this.deleted = deleted;
    }
}
