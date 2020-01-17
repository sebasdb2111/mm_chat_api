import {Psychic}                  from '../domain/entity/Psychic';
import PsychicRepository          from '../domain/PsychicRepository';
import PsychicDeactivateDto       from '../domain/dto/PsychicDeactivateDto';
import PsychicNotExistGuard       from '../../shared/application/PsychicNotExistGuard';

export default class PsychicCreate
{
    private repository: PsychicRepository;

    constructor(repository: PsychicRepository)
    {
        this.repository = repository;
    }

    async run(psychicDeactivateDto: PsychicDeactivateDto): Promise<void>
    {
        const psychic: Psychic = await this.repository.findOneOrFail(psychicDeactivateDto.id);
        //TODO: clausulas de guarda

        psychic.isActive    = psychicDeactivateDto.isActive;

        await new PsychicNotExistGuard(psychicDeactivateDto.id, psychic);

        const psychicDeactivated = await this.repository.updateIsActive(psychicDeactivateDto.id, psychic)

        return Promise.resolve(psychicDeactivated);
    }
}
