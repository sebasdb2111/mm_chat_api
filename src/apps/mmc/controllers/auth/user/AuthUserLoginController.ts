import {Request, Response}         from 'express';
import * as httpStatus             from 'http-status';
import Controller                  from '../../Controller';
import AuthUserLogin               from '../../../../../contexts/mmc/auth/application/user/AuthUserLogin';
import AuthLoginDto                from '../../../../../contexts/mmc/auth/domain/dto/AuthLoginDto';
import PasswordIsNotValidException from '../../../../../contexts/mmc/auth/domain/exceptions/PasswordIsNotValidException';


export class AuthUserLoginController implements Controller
{
    constructor(private authUserLogin: AuthUserLogin)
    {
    }

    async run(req: Request, res: Response)
    {
        const authLoginDto: AuthLoginDto = new AuthLoginDto(
            req.body.username,
            req.body.password,
        );

        try {
            const token = await this.authUserLogin.run(authLoginDto);
            res.status(httpStatus.ACCEPTED).send(token);
        }
        catch (e) {
            if (e instanceof PasswordIsNotValidException) {
                res.status(httpStatus.UNAUTHORIZED).send(e.message);
            } else {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json(e);
            }
        }
    }
}
