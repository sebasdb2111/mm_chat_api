import * as jwt          from 'jsonwebtoken';
import config            from '../../../../../apps/mmc/config/config';
import PsychicRepository from '../../../psychics/domain/PsychicRepository';
import {Psychic}         from '../../../psychics/domain/entity/Psychic';
import AuthLoginDto      from '../../domain/dto/AuthLoginDto';

export default class AuthPsychicLogin
{
    private repository: PsychicRepository;

    constructor(repository: PsychicRepository)
    {
        this.repository = repository;
    }

    async run(authLoginDto: AuthLoginDto): Promise<string>
    {
        const psychic: Psychic = await this.repository.findOneByUsername(authLoginDto.username);

        psychic.checkIfUnencryptedPasswordIsValid(authLoginDto.password);

        // TODO: meter la fecha actual
        // user.lastLogin = ;
        await this.repository.updateLastLogin(psychic.id, psychic);

        const psychicToken: string = await this.createJwt(psychic);

        return Promise.resolve(psychicToken);
    }

    async createJwt(psychic: Psychic): Promise<string>
    {
        return jwt.sign(
            {psychicId: psychic.id, username: psychic.username},
            config.jwtSecret,
            {expiresIn: '1h'}
        );
    }
}
