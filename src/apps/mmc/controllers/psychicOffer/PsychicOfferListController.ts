import {Request, Response}        from 'express';
import * as httpStatus            from 'http-status';
import Controller                 from '../Controller';
import PsychicOfferList                from '../../../../contexts/mmc/psychicOffers/application/PsychicOfferList';

export class PsychicOfferListController implements Controller
{
    constructor(private psychicOfferList: PsychicOfferList)
    {
    }

    async run(req: Request, res: Response)
    {
        return new Promise(async (resolve, reject) =>
        {
            try {
                const psychic = await this.psychicOfferList.run();

                resolve(res.status(httpStatus.OK).send(psychic));
            }
            catch (error) {
                let httpStatusError = httpStatus.INTERNAL_SERVER_ERROR;

                reject(res.status(httpStatusError).send(error.message));
            }
        });
    }
}
