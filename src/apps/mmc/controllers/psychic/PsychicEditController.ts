import {Request, Response}            from 'express';
import * as httpStatus                from 'http-status';
import Controller                     from '../Controller';
import PsychicEdit                   from '../../../../contexts/mmc/psychics/application/PsychicEdit';
import PsychicEditDto                from '../../../../contexts/mmc/psychics/domain/dto/PsychicEditDto';
import PsychicNotExistException      from '../../../../contexts/mmc/shared/domain/exceptions/PsychicNotExistsException';

export class PsychicEditController implements Controller
{
    constructor(private psychicEdit: PsychicEdit)
    {
    }

    async run(req: Request, res: Response)
    {
        return new Promise(async (resolve, reject) =>
        {
            const psychicDto: PsychicEditDto = new PsychicEditDto(
                Number(req.params.id),
                req.body.role,
                req.body.email,
                req.body.firstName,
                req.body.lastName
            );

            try {
                const psychic = await this.psychicEdit.run(psychicDto);
                resolve(res.status(httpStatus.CREATED).send(psychic));
            }
            catch (error) {
                let httpStatusError = httpStatus.INTERNAL_SERVER_ERROR;

                if (error instanceof PsychicNotExistException) {
                    httpStatusError = httpStatus.BAD_REQUEST;
                }

                reject(res.status(httpStatusError).send(error.message));
            }
        });
    }
}
