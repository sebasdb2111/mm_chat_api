import {Request}             from 'express';
import config                from '../../../../apps/mmc/config/config';
import * as jwt              from 'jsonwebtoken';
import {GetTokenFromRequest} from '../../../shared/application/GetTokenFromRequest';

export const GetIdUsernameAndEntityTypeFromToken = (req: Request) =>
{
    const token: string = GetTokenFromRequest(req);
    const jwtPayload    = jwt.verify(token, config.jwtSecret);

    let response = {
        customerId: null,
        psychicId : null,
        userId    : null,
        username  : jwtPayload.username,
        entityType: jwtPayload.entityType,
    };

    switch (jwtPayload.entityType) {
        case 'CUSTOMER':
            response.customerId = jwtPayload.customerId;
            break;
        case 'PSYCHIC':
            response.psychicId = jwtPayload.psychicId;
            break;
        case 'USER':
            response.userId = jwtPayload.userId;
            break;
    }

    return response;
};
