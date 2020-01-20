import {Request, Response}           from 'express';
import * as httpStatus               from 'http-status';
import Controller                    from '../Controller';
import PsychicCreate                 from '../../../../contexts/mmc/psychics/application/PsychicCreate';
import PsychicCreateDto              from '../../../../contexts/mmc/psychics/domain/dto/PsychicCreateDto';
import PsychicAlreadyExistsException from '../../../../contexts/mmc/psychics/domain/exceptions/PsychicAlreadyExistsException';

export class PsychicCreateController implements Controller
{
    constructor(private psychicCreate: PsychicCreate)
    {
    }

    async run(req: Request, res: Response)
    {
        return new Promise(async (resolve, reject) =>
        {
            const psychicCreateDto: PsychicCreateDto = new PsychicCreateDto(
                req.body.username,
                req.body.password,
                req.body.email,
                req.body.firstName,
                req.body.lastName,
                Boolean(req.body.isActive)
            );

            try {
                const psychic = await this.psychicCreate.run(psychicCreateDto);

                resolve(res.status(httpStatus.CREATED).send(psychic));
            }
            catch (error) {
                let httpStatusError = httpStatus.INTERNAL_SERVER_ERROR;

                if (error instanceof PsychicAlreadyExistsException) {
                    httpStatusError = httpStatus.BAD_REQUEST;
                }

                reject(res.status(httpStatusError).send(error.message));
            }
        });
    }
}
