import {Request, Response, NextFunction} from 'express';
import {getRepository}                   from 'typeorm';
import * as httpStatus                   from 'http-status';
import {User}                            from '../../mmc/users/domain/entity/User';

export const CheckRole = (roles: string[]) =>
{
    return async (req: Request, res: Response, next: NextFunction) =>
    {
        const id = res.locals.jwtPayload.userId;

        const userRepository = getRepository(User);
        let user: User;

        try {
            user = await userRepository.findOneOrFail(id);
        }
        catch (id) {
            res.status(httpStatus.UNAUTHORIZED).send();
        }

        if (roles.indexOf(user.role) > -1) {
            next();
        } else {
            res.status(httpStatus.UNAUTHORIZED).send();
        }
    };
};
