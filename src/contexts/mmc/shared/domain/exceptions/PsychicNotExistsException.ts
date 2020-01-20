export default class PsychicNotExistsException extends Error
{
    constructor(psychicId: number)
    {
        super(`Psychic with id: ${psychicId} not exists`);
    }
}
