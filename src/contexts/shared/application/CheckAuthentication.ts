import {Request, Response, NextFunction} from 'express';
import * as jwt                          from 'jsonwebtoken';
import config                            from '../../../apps/mmc/config/config';
import * as httpStatus                   from 'http-status';
import {GetTokenFromRequest}             from './GetTokenFromRequest';

export const CheckAuthentication = (req: Request, res: Response, next: NextFunction) =>
{
    const token: string = GetTokenFromRequest(req);
    let tokenError;

    if (null === token) {
        tokenError = {
            code   : 'UNAUTHORIZED',
            message: 'Token not found'
        };
    }

    let jwtPayload;
    try {
        jwtPayload = jwt.verify(token, config.jwtSecret);
        if (!jwtPayload) {
            tokenError = {
                code   : 'UNAUTHORIZED',
                message: 'Request id mismatches'
            };
        }
        else {
            res.locals.jwtPayload = jwtPayload;
        }

    }
    catch (jwtError) {
        tokenError = {
            code   : 'UNAUTHORIZED',
            message: 'Invalid token',
            cause  : jwtError
        };
    }

    if (tokenError) {
        res.status(httpStatus.UNAUTHORIZED).send(tokenError);
    }

    const payload  = {
        userId    : jwtPayload.userId ? jwtPayload.userId : null,
        customerId: jwtPayload.customerId ? jwtPayload.customerId : null,
        psychicId : jwtPayload.psychicId ? jwtPayload.psychicId : null,
        username  : jwtPayload.username ? jwtPayload.username : null,
        entityType: jwtPayload.entityType ? jwtPayload.entityType : null
    };
    const newToken = jwt.sign(payload, config.jwtSecret, {expiresIn: '1h'});

    res.setHeader('token', newToken);
    next();
};
