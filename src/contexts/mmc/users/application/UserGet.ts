import {User}            from '../domain/entity/User';
import UserRepository    from '../domain/UserRepository';
import UserNotExistGuard from "../../shared/application/UserNotExistGuard";

export default class UserGet
{
    private repository: UserRepository;

    constructor(repository: UserRepository)
    {
        this.repository = repository;
    }

    async run(userId: number): Promise<User>
    {
        try {
            const user: User = await this.repository.findOneOrFail(userId);

            await new UserNotExistGuard(userId, user);

            return Promise.resolve(user);
        }
        catch (error) {
            return Promise.reject(error)
        }
    }
}
