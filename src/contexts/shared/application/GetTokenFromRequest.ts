import {Request} from 'express';

export const GetTokenFromRequest = (req: Request) =>
{
    let authorizationString;
    if (req && req.headers && req.headers.authorization) {
        authorizationString = req.headers.authorization
            ? req.headers.authorization.split(' ')
            : null;
    }
    let response = null;
    if (authorizationString && (authorizationString[0] === 'Token' || authorizationString[0] === 'Bearer')) {
        response = authorizationString[1];
    }
    else if (req && req.query && req.query.jwt) {
        response = req.query.jwt;
    }
    return response;
};
