import {User}            from '../domain/entity/User';
import UserRepository    from '../domain/UserRepository';
import UserDeactivateDto from '../domain/dto/UserDeactivateDto';
import UserNotExistGuard from '../../shared/application/UserNotExistGuard';

export default class UserDeactivate
{
    private repository: UserRepository;

    constructor(repository: UserRepository)
    {
        this.repository = repository;
    }

    async run(userDeactivateDto: UserDeactivateDto): Promise<void>
    {
        const user: User = await this.repository.findOneOrFail(userDeactivateDto.id);
        user.isActive    = userDeactivateDto.isActive;

        await new UserNotExistGuard(userDeactivateDto.id, user);

        const userDeactivated = await this.repository.updateIsActive(userDeactivateDto.id, user);

        return Promise.resolve(userDeactivated);
    }
}
