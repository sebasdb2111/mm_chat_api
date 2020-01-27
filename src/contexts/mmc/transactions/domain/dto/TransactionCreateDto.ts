import {CurrencyEnum} from '../../../../shared/domain/CurrencyEnum';

export default class TransactionCreateDto
{
    public customerId: number;
    public total: number;
    public currency: CurrencyEnum;
    public paymentMethodId: number;
    public psychicOfferId: number;


    constructor(
        customerId: number,
        total: number,
        currency: CurrencyEnum,
        paymentMethodId: number,
        psychicOfferId: number,
    )
    {
        this.customerId      = customerId;
        this.total           = total;
        this.currency        = currency;
        this.paymentMethodId = paymentMethodId;
        this.psychicOfferId  = psychicOfferId;
    }
}
