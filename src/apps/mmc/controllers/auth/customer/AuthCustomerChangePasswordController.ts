import {Request, Response}        from 'express';
import * as httpStatus            from 'http-status';
import Controller                 from '../../Controller';
import AuthCustomerChangePassword from '../../../../../contexts/mmc/auth/application/customer/AuthCustomerChangePassword';
import AuthChangePasswordDto      from '../../../../../contexts/mmc/auth/domain/dto/AuthChangePasswordDto';


export class AuthCustomerChangePasswordController implements Controller
{
    constructor(private authCustomerChangePassword: AuthCustomerChangePassword)
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
                await this.authCustomerChangePassword.run(authChangePasswordDto);
                resolve(res.status(httpStatus.OK).send(`Password for the customer ${req.body.username} has been changed successfully`));
            }
            catch (e) {
                reject(res.status(httpStatus.INTERNAL_SERVER_ERROR).json(e));
            }
        });
    }
}
