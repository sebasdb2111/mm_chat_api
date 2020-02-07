import * as jwt           from 'jsonwebtoken';
import UserRepository     from '../../../users/domain/UserRepository';
import {User}             from '../../../users/domain/entity/User';
import config             from '../../../../../apps/mmc/config/config';
import AuthLoginDto       from '../../domain/dto/AuthLoginDto';
import {AuthEntitiesEnum} from '../../../../shared/domain/AuthEntitiesEnum';

export default class AuthUserLogin
{
    private repository: UserRepository;

    constructor(repository: UserRepository)
    {
        this.repository = repository;
    }

    async run(authLoginDto: AuthLoginDto): Promise<string>
    {
        const user: User = await this.repository.findOneByEmail(authLoginDto.email);

        user.checkIfUnencryptedPasswordIsValid(authLoginDto.password);
        user.updateLastLogin();

        await this.repository.updateLastLogin(user.id, user);

        const psychicToken: string = await this.createJwt(user);

        return Promise.resolve(psychicToken);
    }

    async createJwt(user: User): Promise<string>
    {
        return jwt.sign(
            {
                userId    : user.id,
                username  : user.username,
                entityType: AuthEntitiesEnum.USER
            },
            config.jwtSecret,
            {expiresIn: '1h'}
        );
    }
}
