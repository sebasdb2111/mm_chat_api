import {Request, Response}      from 'express';
import * as httpStatus          from 'http-status';
import Controller               from '../Controller';
import ChatSessionDeactivate    from '../../../../contexts/mmc/chatSessions/application/ChatSessionDeactivate';
import ChatSessionDeactivateDto from '../../../../contexts/mmc/chatSessions/domain/dto/ChatSessionDeactivateDto';

export class ChatSessionDeactivateController implements Controller
{
    constructor(private chatSessionDeactivate: ChatSessionDeactivate)
    {
    }

    async run(req: Request, res: Response)
    {
        return new Promise(async (resolve, reject) =>
        {
            const chatSessionDeactivateDto: ChatSessionDeactivateDto = new ChatSessionDeactivateDto(
                Number(req.params.id),
                Boolean(req.body.isActive)
            );

            try {
                await this.chatSessionDeactivate.run(chatSessionDeactivateDto);
                resolve(res.status(httpStatus.OK).send(`Chat session ${req.params.id} has been deactivated successfully`));
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
