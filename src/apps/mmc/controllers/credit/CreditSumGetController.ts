import {Request, Response} from 'express';
import * as httpStatus from 'http-status';
import Controller from '../Controller';
import CreditListByCustomerIdAndPsychicId from '../../../../contexts/mmc/credits/application/CreditListByCustomerIdAndPsychicId';

export class CreditSumGetController implements Controller {
	constructor(private creditListByCustomerIdAndPsychicId: CreditListByCustomerIdAndPsychicId)
	{
	}

	async run(req: Request, res: Response) {
		return new Promise(async (resolve, reject) => {
			try {
				const credit = await this.creditListByCustomerIdAndPsychicId.run(
					Number(res.locals.jwtPayload.customerId),
					Number(req.query.psychicId)
				);

				resolve(res.status(httpStatus.CREATED).send(credit));
			} catch (error) {
				let httpStatusError = httpStatus.INTERNAL_SERVER_ERROR;

				reject(res.status(httpStatusError).send(error.message));
			}
		});
	}
}
