import {Psychic}         from '../domain/entity/Psychic';
import PsychicRepository from '../domain/PsychicRepository';
import PsychicCreateDto  from '../domain/dto/PsychicCreateDto';

export default class PsychicCreate
{
    private repository: PsychicRepository;

    constructor(repository: PsychicRepository)
    {
        this.repository = repository;
    }

    async run(psychicDto: PsychicCreateDto): Promise<Psychic>
    {
        const psychic: Psychic = new Psychic();
        psychic.username        = psychicDto.username;
        psychic.password        = psychicDto.password;
        psychic.email           = psychicDto.email;
        psychic.firstName       = psychicDto.firstName;
        psychic.lastName        = psychicDto.lastName;
        psychic.isActive        = true;

        psychic.hashPassword();

        const newPsychic: Psychic = await this.repository.save(psychic);

        return Promise.resolve(newPsychic);
    }
}
