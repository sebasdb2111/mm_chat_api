import {Psychic} from './entity/Psychic';

export default interface PsychicRepository
{
    findOneOrFail(id: number): Promise<Psychic>;

    findOneByUsername(username: string): Promise<Psychic>;

    save(psychic: Psychic): Promise<Psychic>;

    update(psychic: Psychic): Promise<Psychic>;

    updateIsActive(id: number, psychic: Psychic): Promise<void>;

    updatePassword(id: number, psychic: Psychic): Promise<void>;

    updateLastLogin(id: number, psychic: Psychic): Promise<void>;
}
