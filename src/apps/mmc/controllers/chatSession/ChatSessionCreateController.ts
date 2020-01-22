import {Request, Response}  from 'express';
import * as httpStatus      from 'http-status';
import Controller           from '../Controller';
import ChatSessionCreate    from '../../../../contexts/mmc/chatSessions/application/ChatSessionCreate';
import ChatSessionCreateDto from '../../../../contexts/mmc/chatSessions/domain/dto/ChatSessionCreateDto';

export class ChatSessionCreateController implements Controller
{
    constructor(private chatSessionCreate: ChatSessionCreate)
    {
    }

    async run(req: Request, res: Response)
    {
        return new Promise(async (resolve, reject) =>
        {
            const chatSessionCreateDto: ChatSessionCreateDto = new ChatSessionCreateDto(
                res.locals.jwtPayload.customerId,
                Number(req.body.psychicId),
                Number(req.body.userId)
            );

            try {
                const chatSession = await this.chatSessionCreate.run(chatSessionCreateDto);
                resolve(res.status(httpStatus.CREATED).send(chatSession));
            }
            catch (error) {
                let httpStatusError = httpStatus.INTERNAL_SERVER_ERROR;

                // if (error instanceof UserAlreadyExistsException) {
                //     httpStatusError = httpStatus.BAD_REQUEST;
                // }

                reject(res.status(httpStatusError).send(error.message));
            }
        });
    }
}
