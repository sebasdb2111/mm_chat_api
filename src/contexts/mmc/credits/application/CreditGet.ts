import {Credit}            from '../domain/entity/Credit';
import CreditRepository    from '../domain/CreditRepository';
import CreditNotExistGuard from '../../shared/application/CreditNotExistGuard';

export default class CreditGet
{
    private repository: CreditRepository;

    constructor(repository: CreditRepository)
    {
        this.repository = repository;
    }

    async run(creditId: number): Promise<Credit>
    {
        try {
            const credit: Credit = await this.repository.findOneOrFail(creditId);

            await new CreditNotExistGuard(creditId, credit);

            return Promise.resolve(credit);
        }
        catch (error) {
            return Promise.reject(error)
        }
    }
}
