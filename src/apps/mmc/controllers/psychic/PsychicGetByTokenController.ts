import {Request, Response}                 from 'express';
import * as httpStatus                     from 'http-status';
import Controller                          from '../Controller';
import PsychicGet                         from '../../../../contexts/mmc/psychics/application/PsychicGet';
import PsychicNotExistsException          from '../../../../contexts/mmc/shared/domain/exceptions/PsychicNotExistsException';
import YouAreNotOwnerOfTheElementException from '../../../../contexts/mmc/shared/domain/exceptions/YouAreNotOwnerOfTheElementException';

export class PsychicGetByTokenController implements Controller
{
	constructor(private psychicGet: PsychicGet)
	{
	}

	async run(req: Request, res: Response)
	{
		return new Promise(async (resolve, reject) =>
		{
			try {
				const id: number = res.locals.jwtPayload.psychicId;
				const psychic = await this.psychicGet.run(id);

				resolve(res.status(httpStatus.OK).send(psychic));
			}
			catch (error) {
				let httpStatusError = httpStatus.INTERNAL_SERVER_ERROR;

				if (error instanceof PsychicNotExistsException || error instanceof YouAreNotOwnerOfTheElementException) {
					httpStatusError = httpStatus.BAD_REQUEST;
				}

				reject(res.status(httpStatusError).send(error.message));
			}
		});
	}
}
