import {getRepository} from 'typeorm';
import {User}          from '../domain/entity/User';
import UserRepository  from '../domain/UserRepository';

export default class TypeormUserRepository implements UserRepository
{
    async findOneOrFail(id: number): Promise<User>
    {
        try {
            const userRepository = getRepository(User);
            const user: User     = await userRepository.findOneOrFail(id);
            return Promise.resolve(user);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }

    async findOneByUsername(username: string): Promise<User>
    {
        try {
            const userRepository = getRepository(User);
            const user: User     = await userRepository.findOneOrFail({where: {username}});
            return Promise.resolve(user);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }

    async save(user: User): Promise<User>
    {
        try {
            const userRepository = getRepository(User);
            const saveUser: User = await userRepository.save(user);
            return Promise.resolve(saveUser);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }

    async update(user: User): Promise<User>
    {
        try {
            const userRepository   = getRepository(User);
            const updateUser: User = await userRepository.save(user);
            return Promise.resolve(updateUser);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }

    async updateIsActive(id: number, user: User): Promise<void>
    {
        try {
            const userRepository = getRepository(User);
            await userRepository.update(id, {isActive: user.isActive});
        }
        catch (error) {
            return Promise.reject(error);
        }
    }

    async updatePassword(id: number, user: User): Promise<void>
    {
        try {
            const userRepository = getRepository(User);
            await userRepository.update(id, {password: user.password});
        }
        catch (error) {
            return Promise.reject(error);
        }
    }

    async updateLastLogin(id: number, user: User): Promise<void>
    {
        try {
            const userRepository = getRepository(User);
            await userRepository.update(id, {lastLogin: user.lastLogin});
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
}
