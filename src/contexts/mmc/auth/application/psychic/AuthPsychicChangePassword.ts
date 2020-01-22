import PsychicRepository     from '../../../psychics/domain/PsychicRepository';
import {Psychic}             from '../../../psychics/domain/entity/Psychic';
import AuthChangePasswordDto from '../../domain/dto/AuthChangePasswordDto';

export default class AuthPsychicChangePassword
{
    private repository: PsychicRepository;

    constructor(repository: PsychicRepository)
    {
        this.repository = repository;
    }

    async run(authChangePasswordDto: AuthChangePasswordDto): Promise<void>
    {
        const psychic: Psychic = await this.repository.findOneByUsername(authChangePasswordDto.username);
        psychic.password       = authChangePasswordDto.password;

        psychic.hashPassword();

        const passwordChanged: void = await this.repository.updatePassword(psychic.id, psychic);

        return Promise.resolve(passwordChanged);
    }
}
