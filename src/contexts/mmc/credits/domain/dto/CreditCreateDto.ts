export default class CreditCreateDto
{
    // public time: number;
    public coins: number;
    public customerId: number;
    public psychicId: number;

    constructor(
        // time: number,
        coins: number,
        customerId: number,
        psychicId: number,
    )
    {
        // this.time       = customerId;
        this.coins      = customerId;
        this.customerId = customerId;
        this.psychicId  = psychicId;
    }
}
