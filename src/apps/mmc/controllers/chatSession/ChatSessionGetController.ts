import {Request, Response} from 'express';
import * as httpStatus     from 'http-status';
import Controller          from '../Controller';
import ChatSessionGet      from '../../../../contexts/mmc/chatSessions/application/ChatSessionGet';


export class ChatSessionGetController implements Controller
{
    constructor(private chatSessionGet: ChatSessionGet)
    {
    }

    async run(req: Request, res: Response)
    {
        return new Promise(async (resolve, reject) =>
        {
            const id: number = Number(req.params.id);

            try {
                const chatSession = await this.chatSessionGet.run(id);
                resolve(res.status(httpStatus.CREATED).send(chatSession));
            }
            catch (error) {
                let httpStatusError = httpStatus.INTERNAL_SERVER_ERROR;

                // if (error instanceof UserNotExistsException) {
                //     httpStatusError = httpStatus.BAD_REQUEST;
                // }

                reject(res.status(httpStatusError).send(error.message));
            }
        });
    }
}
