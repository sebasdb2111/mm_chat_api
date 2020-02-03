import {Request, Response} from 'express';
import * as httpStatus     from 'http-status';
import Controller          from '../Controller';
import ChatSessionGetList  from '../../../../contexts/mmc/chatSessions/application/ChatSessionGetList';


export class ChatSessionGetListController implements Controller
{
    constructor(private chatSessionGetList: ChatSessionGetList)
    {
    }

    async run(req: Request, res: Response)
    {
        return new Promise(async (resolve, reject) =>
        {
            try {
				const ownerId: number = res.locals.jwtPayload.customerId;
                const chatSessionList = await this.chatSessionGetList.run(ownerId);

                resolve(res.status(httpStatus.OK).send(chatSessionList));
            }
            catch (error) {
                let httpStatusError = httpStatus.INTERNAL_SERVER_ERROR;

                reject(res.status(httpStatusError).send(error.message));
            }
        });
    }
}
