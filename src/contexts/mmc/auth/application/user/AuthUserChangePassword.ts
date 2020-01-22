import UserRepository        from '../../../users/domain/UserRepository';
import {User}                from '../../../users/domain/entity/User';
import AuthChangePasswordDto from '../../domain/dto/AuthChangePasswordDto';

export default class AuthUserChangePassword
{
    private repository: UserRepository;

    constructor(repository: UserRepository)
    {
        this.repository = repository;
    }

    async run(authChangePasswordDto: AuthChangePasswordDto): Promise<void>
    {
        const user: User = await this.repository.findOneByUsername(authChangePasswordDto.username);
        user.password    = authChangePasswordDto.password;

        user.hashPassword();

        const passwordChanged: void = await this.repository.updatePassword(user.id, user);

        return Promise.resolve(passwordChanged);
    }
}
