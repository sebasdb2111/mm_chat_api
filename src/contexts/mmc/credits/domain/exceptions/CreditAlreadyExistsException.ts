export default class CreditAlreadyExistsException extends Error
{
    constructor(creditId: number)
    {
        super(`The credit with id: ${creditId} not exists`);
    }
}
