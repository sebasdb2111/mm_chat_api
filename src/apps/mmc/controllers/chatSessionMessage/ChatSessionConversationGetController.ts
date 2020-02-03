import {Request, Response} from 'express';
import * as httpStatus     from 'http-status';
import Controller          from '../Controller';
import ChatSessionConversationGet from '../../../../contexts/mmc/chatSessionMessages/application/ChatSessionConversationGet';


export class ChatSessionConversationGetController implements Controller
{
    constructor(private chatSessionMessageList: ChatSessionConversationGet)
    {
    }

    async run(req: Request, res: Response)
    {
        return new Promise(async (resolve, reject) =>
        {
            try {
				const id: number = Number(req.params.id);
                const chatSession = await this.chatSessionMessageList.run(id);
                resolve(res.status(httpStatus.OK).send(chatSession));
            }
            catch (error) {
                let httpStatusError = httpStatus.INTERNAL_SERVER_ERROR;
                reject(res.status(httpStatusError).send(error.message));
            }
        });
    }
}
