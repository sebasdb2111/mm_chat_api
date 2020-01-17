export default class CustomerNotExistsException extends Error
{
    constructor(customerId: number)
    {
        super(`Customer with id: ${customerId} not exists`);
    }
}
