import {Psychic}            from '../domain/entity/Psychic';
import PsychicRepository    from '../domain/PsychicRepository';
import PsychicNotExistGuard from '../../shared/application/PsychicNotExistGuard';

export default class PsychicGet
{
    private repository: PsychicRepository;

    constructor(repository: PsychicRepository)
    {
        this.repository = repository;
    }

    async run(psychicId: number): Promise<Psychic>
    {
        try {
            const psychic: Psychic = await this.repository.findOneOrFail(psychicId);

            await new PsychicNotExistGuard(psychicId, psychic);

            return Promise.resolve(psychic);
        }
        catch (error) {
            return Promise.reject(error)
        }

    }
}
