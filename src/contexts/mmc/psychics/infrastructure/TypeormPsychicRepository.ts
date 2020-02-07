import {getRepository}    from 'typeorm';
import {Psychic}         from '../domain/entity/Psychic';
import PsychicRepository from '../domain/PsychicRepository';

export default class TypeormPsychicRepository implements PsychicRepository
{
    async findOneOrFail(id: number): Promise<Psychic>
    {
        const psychicRepository = getRepository(Psychic);
        const psychic: Psychic = await psychicRepository.findOneOrFail(id);
        return Promise.resolve(psychic);
    }

    async findOneByEmail(email: string): Promise<Psychic>
    {
        const psychicRepository = getRepository(Psychic);
        const psychic: Psychic = await psychicRepository.findOneOrFail({where: {email}});
        return Promise.resolve(psychic);
    }

    async save(psychic: Psychic): Promise<Psychic>
    {
        const psychicRepository     = getRepository(Psychic);
        const savePsychic: Psychic = await psychicRepository.save(psychic);
        return Promise.resolve(savePsychic);
    }

    async update(psychic: Psychic): Promise<Psychic>
    {
        const psychicRepository       = getRepository(Psychic);
        const updatePsychic: Psychic = await psychicRepository.save(psychic);
        return Promise.resolve(updatePsychic);
    }

    async updateIsActive(id: number, psychic: Psychic): Promise<void>
    {
        const psychicRepository = getRepository(Psychic);
        await psychicRepository.update(id, {isActive: psychic.isActive});
    }

    async updatePassword(id: number, psychic: Psychic): Promise<void>
    {
        const psychicRepository = getRepository(Psychic);
        await psychicRepository.update(id, {password: psychic.password});
    }

    async updateLastLogin(id: number, psychic: Psychic): Promise<void>
    {
        const psychicRepository = getRepository(Psychic);
        await psychicRepository.update(id, {lastLogin: psychic.lastLogin});
    }
}
