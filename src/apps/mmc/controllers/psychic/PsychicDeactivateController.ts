import {Request, Response}            from 'express';
import * as httpStatus                from 'http-status';
import Controller                     from '../Controller';
import PsychicDeactivate             from '../../../../contexts/mmc/psychics/application/PsychicDeactivate';
import PsychicDeactivateDto          from '../../../../contexts/mmc/psychics/domain/dto/PsychicDeactivateDto';
import PsychicNotExistsException     from '../../../../contexts/mmc/shared/domain/exceptions/PsychicNotExistsException';

export class PsychicDeactivateController implements Controller
{
    constructor(private psychicDeactivate: PsychicDeactivate)
    {
    }

    async run(req: Request, res: Response)
    {
        return new Promise(async (resolve, reject) =>
        {
            const psychicDeactivateDto: PsychicDeactivateDto = new PsychicDeactivateDto(
                Number(req.params.id),
                Boolean(req.body.isActive)
            );

            try {
                await this.psychicDeactivate.run(psychicDeactivateDto);
                resolve(res.status(httpStatus.OK).send(`Psychic ${req.params.id} has been deactivated successfully`));
            }
            catch (error) {
                let httpStatusError = httpStatus.INTERNAL_SERVER_ERROR;

                if (error instanceof PsychicNotExistsException) {
                    httpStatusError = httpStatus.BAD_REQUEST;
                }

                reject(res.status(httpStatusError).send(error.message));
            }
        });
    }
}
