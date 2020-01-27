export default class ThereAreNotEnoughFunds extends Error
{
    constructor()
    {
        super(`There are not enough funds`);
    }
}
