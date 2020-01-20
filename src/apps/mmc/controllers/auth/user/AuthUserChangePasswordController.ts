import {Request, Response}   from 'express';
import * as httpStatus       from 'http-status';
import Controller            from '../../Controller';
import AuthUserChangePassword    from '../../../../../contexts/mmc/auth/application/user/AuthUserChangePassword';
import AuthChangePasswordDto from '../../../../../contexts/mmc/auth/domain/dto/AuthChangePasswordDto';


export class AuthUserChangePasswordController implements Controller
{
    constructor(private authUserChangePassword: AuthUserChangePassword)
    {
    }

    async run(req: Request, res: Response)
    {
        return new Promise(async (resolve, reject) =>
        {
            const authChangePasswordDto: AuthChangePasswordDto = new AuthChangePasswordDto(
                req.body.username,
                req.body.password,
            );

            try {
                await this.authUserChangePassword.run(authChangePasswordDto);
                res.status(httpStatus.OK).send(`Password for the username ${req.body.username} has been changed successfully`);
            }
            catch (e) {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json(e);
            }
        });
    }
}
