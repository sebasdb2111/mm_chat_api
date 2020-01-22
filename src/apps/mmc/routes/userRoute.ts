import {Router}                   from 'express';
import container                  from '../config/dependency-injection';
import {CheckAuthentication}      from '../../../contexts/shared/application/CheckAuthentication';
import {CheckRole}                from '../../../contexts/shared/application/CheckRole';
import {UserGetController}        from '../controllers/user/UserGetController';
import {UserCreateController}     from '../controllers/user/UserCreateController';
import {UserEditController}       from '../controllers/user/UserEditController';
import {UserDeactivateController} from '../controllers/user/UserDeactivateController';
import {UserRoleEnum}             from '../../../contexts/shared/domain/UserRoleEnum';

const router                                             = Router();
const userCreateController: UserCreateController         = container.get('Apps.mmc.controllers.user.UserCreateController');
const userGetController: UserGetController               = container.get('Apps.mmc.controllers.user.UserGetController');
const userEditController: UserEditController             = container.get('Apps.mmc.controllers.user.UserEditController');
const userDeactivateController: UserDeactivateController = container.get('Apps.mmc.controllers.user.UserDeactivateController');

router
    .post(
        '/',
        CheckAuthentication,
        CheckRole([UserRoleEnum.ADMIN, UserRoleEnum.ANIMATOR]),
        userCreateController.run.bind(userCreateController)
    );

router
    .get(
        '/:id',
        CheckAuthentication,
        CheckRole([UserRoleEnum.ADMIN, UserRoleEnum.ANIMATOR]),
        userGetController.run.bind(userGetController)
    )
    .patch(
        '/:id',
        CheckAuthentication,
        CheckRole([UserRoleEnum.ADMIN, UserRoleEnum.ANIMATOR]),
        userEditController.run.bind(userEditController)
    );

router
    .patch(
        '/:id/deactivate',
        CheckAuthentication,
        CheckRole([UserRoleEnum.ADMIN, UserRoleEnum.ANIMATOR]),
        userDeactivateController.run.bind(userDeactivateController)
    );

export default router;
