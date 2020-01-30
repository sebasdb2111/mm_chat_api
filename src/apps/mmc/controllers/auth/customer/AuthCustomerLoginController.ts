import {Request, Response}         from 'express';
import * as httpStatus             from 'http-status';
import Controller                  from '../../Controller';
import AuthCustomerLogin           from '../../../../../contexts/mmc/auth/application/customer/AuthCustomerLogin';
import AuthLoginDto                from '../../../../../contexts/mmc/auth/domain/dto/AuthLoginDto';
import PasswordIsNotValidException from '../../../../../contexts/mmc/auth/domain/exceptions/PasswordIsNotValidException';


export class AuthCustomerLoginController implements Controller
{
    constructor(private authCustomerLogin: AuthCustomerLogin)
    {
    }

    async run(req: Request, res: Response)
    {
        return new Promise(async (resolve, reject) =>
        {
            try {
				const authLoginDto: AuthLoginDto = new AuthLoginDto(
					req.body.username,
					req.body.password
				);

                const token = await this.authCustomerLogin.run(authLoginDto);
                resolve(res.status(httpStatus.ACCEPTED).send(token));
            }
            catch (error) {
                if (error instanceof PasswordIsNotValidException) {
                    reject(res.status(httpStatus.UNAUTHORIZED).send(error.message));
                } else {
                    reject(res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error));
                }
            }
        });
    }
}
