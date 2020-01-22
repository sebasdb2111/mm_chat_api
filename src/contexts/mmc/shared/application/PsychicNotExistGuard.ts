import PsychicNotExistException from '../../shared/domain/exceptions/PsychicNotExistsException';
import {Psychic}                from '../../psychics/domain/entity/Psychic';

export default class PsychicNotExistGuard
{
    private psychicId: number;
    private psychic: Psychic;

    constructor(psychicId: number, psychic: Psychic)
    {
        this.psychicId = psychicId;
        this.psychic   = psychic;
    }

    async run()
    {
        if (!this.psychic) {
            throw new PsychicNotExistException(this.psychicId);
        }
    }
}
