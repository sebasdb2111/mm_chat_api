import {Request, Response}         from 'express';
import * as httpStatus             from 'http-status';
import Controller                  from '../../Controller';
import AuthPsychicLogin           from '../../../../../contexts/mmc/auth/application/psychic/AuthPsychicLogin';
import AuthLoginDto                from '../../../../../contexts/mmc/auth/domain/dto/AuthLoginDto';
import PasswordIsNotValidException from '../../../../../contexts/mmc/auth/domain/exceptions/PasswordIsNotValidException';


export class AuthPsychicLoginController implements Controller
{
    constructor(private authPsychicLogin: AuthPsychicLogin)
    {
    }

    async run(req: Request, res: Response)
    {
        return new Promise(async (resolve, reject) =>
        {
            const authLoginDto: AuthLoginDto = new AuthLoginDto(
                req.body.username,
                req.body.password,
            );

            try {
                const token = await this.authPsychicLogin.run(authLoginDto);
                resolve(res.status(httpStatus.ACCEPTED).send(token));
            }
            catch (e) {
                if (e instanceof PasswordIsNotValidException) {
                    reject(res.status(httpStatus.UNAUTHORIZED).send(e.message));
                } else {
                    reject(res.status(httpStatus.INTERNAL_SERVER_ERROR).json(e));
                }
            }
        });
    }
}
