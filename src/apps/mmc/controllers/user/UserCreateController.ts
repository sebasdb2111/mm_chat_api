import {Request, Response}        from 'express';
import UserCreate                 from '../../../../contexts/mmc/users/application/UserCreate';
import * as httpStatus            from 'http-status';
import Controller                 from '../Controller';
import UserCreateDto              from '../../../../contexts/mmc/users/domain/dto/UserCreateDto';
import UserAlreadyExistsException from '../../../../contexts/mmc/users/domain/exceptions/UserAlreadyExistsException';

export class UserCreateController implements Controller
{
    constructor(private userCreate: UserCreate)
    {
    }

    async run(req: Request, res: Response)
    {
        const userCreateDto: UserCreateDto = new UserCreateDto(
            req.body.username,
            req.body.password,
            req.body.role,
            req.body.email,
            req.body.firstName,
            req.body.lastName,
            req.body.isActive,
        );

        try {
            const user = await this.userCreate.run(userCreateDto);
            res.status(httpStatus.CREATED).send(user);
        }
        catch (error) {
            if (error instanceof UserAlreadyExistsException) {
                res.status(httpStatus.BAD_REQUEST).send(error.message);
            } else {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
            }
        }
    }
}
