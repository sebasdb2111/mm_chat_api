export default class CreditCreateDto
{
    public time: number;
    public coins: number;
    public customerId: number;
    public psychicId: number;
    public transactionId: number;

    constructor(
        time: number,
        coins: number,
        customerId: number,
        psychicId: number,
        transactionId: number,
    )
    {
        this.time          = time;
        this.coins         = coins;
        this.customerId    = customerId;
        this.psychicId     = psychicId;
        this.transactionId = transactionId;
    }
}
