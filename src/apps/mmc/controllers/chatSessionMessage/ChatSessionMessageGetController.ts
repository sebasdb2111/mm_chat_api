import {Request, Response}        from 'express';
import * as httpStatus            from 'http-status';
import Controller                 from '../Controller';
import ChatSessionMessageGet from '../../../../contexts/mmc/chatSessionMessages/application/ChatSessionMessageGet';


export class ChatSessionMessageGetController implements Controller
{
    constructor(private chatSessionMessageGet: ChatSessionMessageGet)
    {
    }

    async run(req: Request, res: Response)
    {
        return new Promise(async (resolve, reject) =>
        {
            const id: number = Number(req.params.id);

            try {
                const chatSessionMessage = await this.chatSessionMessageGet.run(id);
                resolve(res.status(httpStatus.CREATED).send(chatSessionMessage));
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
