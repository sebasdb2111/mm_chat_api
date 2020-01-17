import * as jwt       from 'jsonwebtoken';
import UserRepository from '../../../users/domain/UserRepository';
import {User}         from '../../../users/domain/entity/User';
import config         from '../../../../../apps/mmc/config/config';
import AuthLoginDto   from '../../domain/dto/AuthLoginDto';

export default class AuthUserLogin
{
    private repository: UserRepository;

    constructor(repository: UserRepository)
    {
        this.repository = repository;
    }

    async run(authLoginDto: AuthLoginDto): Promise<string>
    {
        const user: User = await this.repository.findOneByUsername(authLoginDto.username);

        user.checkIfUnencryptedPasswordIsValid(authLoginDto.password);

        // TODO: meter la fecha actual
        // user.lastLogin = ;
        await this.repository.updateLastLogin(user.id, user);

        return this.createJwt(user);
    }

    async createJwt(user: User): Promise<string>
    {
        return jwt.sign(
            {userId: user.id, username: user.username},
            config.jwtSecret,
            {expiresIn: '1h'}
        );
    }
}
