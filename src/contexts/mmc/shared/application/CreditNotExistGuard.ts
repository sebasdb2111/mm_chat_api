import {Credit}                         from '../../credits/domain/entity/Credit';
import CreditNotExistsException         from '../domain/exceptions/CreditNotExistsException';

export default class CreditNotExistGuard
{
    private creditId: number;
    private credit: Credit;

    constructor(creditId: number, credit: Credit)
    {
        this.creditId = creditId;
        this.credit   = credit;
    }

    async run()
    {
        if (!this.credit) {
            throw new CreditNotExistsException(this.creditId);
        }
    }
}
