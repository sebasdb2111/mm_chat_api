import {Request, Response}         from 'express';
import * as httpStatus             from 'http-status';
import Controller                  from '../Controller';
import ChatSessionMessageCreateDto from '../../../../contexts/mmc/chatSessionMessages/domain/dto/ChatSessionMessageCreateDto';
import ChatSessionMessageCreate    from '../../../../contexts/mmc/chatSessionMessages/application/ChatSessionMessageCreate';

export class ChatSessionMessageCreateController implements Controller
{
    constructor(private chatSessionMessageCreate: ChatSessionMessageCreate)
    {
    }

    async run(req: Request, res: Response)
    {
        return new Promise(async (resolve, reject) =>
        {
            const chatSessionMessageCreateDto: ChatSessionMessageCreateDto = new ChatSessionMessageCreateDto(
                req.body.message,
                req.body.userId,
                req.body.psychicId,
                req.body.customerId
            );

            try {
                const chatSessionMessage = await this.chatSessionMessageCreate.run(chatSessionMessageCreateDto);
                resolve(res.status(httpStatus.CREATED).send(chatSessionMessage));
            }
            catch (error) {
                let httpStatusError = httpStatus.INTERNAL_SERVER_ERROR;

                // if (error instanceof ChatSessionMessageAlreadyExistsException) {
                //     httpStatusError = httpStatus.BAD_REQUEST;
                // }

                reject(res.status(httpStatusError).send(error.message));
            }
        });
    }
}
