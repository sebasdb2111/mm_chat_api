// import {Request, Response, NextFunction} from 'express';
// import {getRepository}                   from 'typeorm';
// import * as httpStatus                   from 'http-status';
// import {User}                            from '../../mmc/users/domain/entity/User';
//
// export const checkLoginType = (loginType: string) =>
// {
//     return async (req: Request, res: Response, next: NextFunction) =>
//     {
//         const id = res.locals.jwtPayload.userId;
//
//         const entityRepository = getRepository(loginType);
//         let data;
//
//         try {
//             data = await entityRepository.findOneOrFail(id);
//         }
//         catch (id) {
//             res.status(httpStatus.UNAUTHORIZED).send();
//         }
//
//         if (!data){
//             res.status(httpStatus.UNAUTHORIZED).send();
//         }
// console.log(data);
//         next();
//     };
// };