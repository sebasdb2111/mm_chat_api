import YouAreNotOwnerOfTheElementException from '../domain/exceptions/YouAreNotOwnerOfTheElementException';

export default class YouAreNotOwner
{
    private elementId;
    private tokenId;

    constructor(elementId: number, tokenId: number)
    {
        this.elementId = elementId;
        this.tokenId   = tokenId;
    }

    async run()
    {
        if (this.elementId !== this.tokenId) {
            throw new YouAreNotOwnerOfTheElementException()
        }
    }
}
