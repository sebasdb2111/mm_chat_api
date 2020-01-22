export default class CustomerAlreadyExistsException extends Error
{
    constructor(customerId: string)
    {
        super(`Customer ${customerId} already exists`);
    }
}
