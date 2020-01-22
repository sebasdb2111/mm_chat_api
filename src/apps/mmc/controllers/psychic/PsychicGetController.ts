import {Request, Response}        from 'express';
import * as httpStatus            from 'http-status';
import Controller                 from '../Controller';
import PsychicGet                from '../../../../contexts/mmc/psychics/application/PsychicGet';
import PsychicNotExistsException from '../../../../contexts/mmc/shared/domain/exceptions/PsychicNotExistsException';

export class PsychicGetController implements Controller
{
    constructor(private psychicGet: PsychicGet)
    {
    }

    async run(req: Request, res: Response)
    {
        return new Promise(async (resolve, reject) =>
        {
            const id: number = Number(req.params.id);

            try {
                const psychic = await this.psychicGet.run(id);

                resolve(res.status(httpStatus.OK).send(psychic));
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
