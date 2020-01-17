import {Psychic}            from '../domain/entity/Psychic';
import PsychicRepository    from '../domain/PsychicRepository';
import PsychicEditDto       from '../domain/dto/PsychicEditDto';
import PsychicNotExistGuard from '../../shared/application/PsychicNotExistGuard';

export default class PsychicCreate
{
    private repository: PsychicRepository;

    constructor(repository: PsychicRepository)
    {
        this.repository = repository;
    }

    async run(psychicEditDto: PsychicEditDto): Promise<Psychic>
    {
        const psychic: Psychic = await this.repository.findOneOrFail(psychicEditDto.id);

        await new PsychicNotExistGuard(psychicEditDto.id, psychic);

        psychic.email     = psychicEditDto.email ? psychicEditDto.email : psychic.email;
        psychic.firstName = psychicEditDto.firstName ? psychicEditDto.firstName : psychic.firstName;
        psychic.lastName  = psychicEditDto.lastName ? psychicEditDto.lastName : psychic.lastName;

        const editedPsychic: Psychic = await this.repository.update(psychic);

        return Promise.resolve(editedPsychic);
    }
}