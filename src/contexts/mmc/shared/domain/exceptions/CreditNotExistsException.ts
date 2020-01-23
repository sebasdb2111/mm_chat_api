export default class CreditNotExistsException extends Error
{
    constructor(creditId: number)
    {
        super(`Credit with id: ${creditId} not exists`);
    }
}
