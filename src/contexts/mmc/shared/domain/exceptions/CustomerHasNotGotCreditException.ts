export default class CustomerHasNotGotCreditException extends Error
{
    constructor(customerId: number)
    {
        super(`Customer with id: ${customerId} hasn't got enought credit`);
    }
}
