export default class YouAreNotOwnerOfTheElementException extends Error
{
    constructor()
    {
        super(`You are not owner of the element`);
    }
}
