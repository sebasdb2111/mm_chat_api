import {Request, Response}   from 'express';
import * as httpStatus       from 'http-status';
import Controller            from '../../Controller';
import AuthPsychicChangePassword    from '../../../../../contexts/mmc/auth/application/psychic/AuthPsychicChangePassword';
import AuthChangePasswordDto from '../../../../../contexts/mmc/auth/domain/dto/AuthChangePasswordDto';


export class AuthPsychicChangePasswordController implements Controller
{
    constructor(private authPsychicChangePassword: AuthPsychicChangePassword)
    {
    }

    async run(req: Request, res: Response)
    {
        return new Promise(async (resolve, reject) =>
        {
            const authPsychicChangePasswordDto: AuthChangePasswordDto = new AuthChangePasswordDto(
                req.body.username,
                req.body.password,
            );

            try {
                await this.authPsychicChangePassword.run(authPsychicChangePasswordDto);
                resolve(res.status(httpStatus.OK).send(`Password for the psychic ${req.body.username} has been changed successfully`));
            }
            catch (e) {
                reject(res.status(httpStatus.INTERNAL_SERVER_ERROR).json(e));
            }
        });
    }
}
