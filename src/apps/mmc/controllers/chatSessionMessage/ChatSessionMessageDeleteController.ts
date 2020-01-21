import {Request, Response}         from 'express';
import * as httpStatus             from 'http-status';
import Controller                  from '../Controller';
import ChatSessionMessageDelete    from '../../../../contexts/mmc/chatSessionMessages/application/ChatSessionMessageDelete';
import ChatSessionMessageDeletedDto from '../../../../contexts/mmc/chatSessionMessages/domain/dto/ChatSessionMessageDeletedDto';

export class ChatSessionMessageDeleteController implements Controller
{
    constructor(private chatSessionMessageDelete: ChatSessionMessageDelete)
    {
    }

    async run(req: Request, res: Response)
    {
        return new Promise(async (resolve, reject) =>
        {
            const userDeleteDto: ChatSessionMessageDeletedDto = new ChatSessionMessageDeletedDto(
                Number(req.params.id),
                Boolean(req.body.deleted)
            );

            try {
                await this.chatSessionMessageDelete.run(userDeleteDto);
                resolve(res.status(httpStatus.OK).send(`Message ${req.params.id} has been deleted successfully`));
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
