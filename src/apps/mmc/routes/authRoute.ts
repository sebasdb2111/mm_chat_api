import {Router}                               from 'express';
import container                              from '../config/dependency-injection';
import {CheckAuthentication}                  from '../../../contexts/shared/application/CheckAuthentication';
import {CheckRole}                            from '../../../contexts/shared/application/CheckRole';
import {AuthUserLoginController}              from '../controllers/auth/user/AuthUserLoginController';
import {AuthUserChangePasswordController}     from '../controllers/auth/user/AuthUserChangePasswordController';
import {AuthCustomerLoginController}          from '../controllers/auth/customer/AuthCustomerLoginController';
import {AuthCustomerChangePasswordController} from '../controllers/auth/customer/AuthCustomerChangePasswordController';
import {AuthPsychicLoginController}           from '../controllers/auth/psychic/AuthPsychicLoginController';
import {AuthPsychicChangePasswordController}  from '../controllers/auth/psychic/AuthPsychicChangePasswordController';
import {UserRoleEnum}                         from '../../../contexts/shared/domain/UserRoleEnum';

const router = Router();

const authUserLoginController: AuthUserLoginController = container.get('Apps.mmc.controllers.auth.AuthUserLoginController');
router.post(
    '/user/login',
    authUserLoginController.run.bind(authUserLoginController)
);

const authUserChangePasswordController: AuthUserChangePasswordController = container.get('Apps.mmc.controllers.auth.AuthUserChangePasswordController');
router.patch(
    '/user/change-password',
    CheckAuthentication,
    CheckRole([UserRoleEnum.ADMIN, UserRoleEnum.ANIMATOR]),
    authUserChangePasswordController.run.bind(authUserChangePasswordController)
);

const authCustomerLoginController: AuthCustomerLoginController = container.get('Apps.mmc.controllers.auth.AuthCustomerLoginController');
router.post(
    '/customer/login',
    authCustomerLoginController.run.bind(authCustomerLoginController)
);

const authCustomerChangePasswordController: AuthCustomerChangePasswordController = container.get('Apps.mmc.controllers.auth.AuthCustomerChangePasswordController');
router.patch(
    '/customer/change-password',
    CheckAuthentication,
    authCustomerChangePasswordController.run.bind(authCustomerChangePasswordController)
);

const authPsychicLoginController: AuthPsychicLoginController = container.get('Apps.mmc.controllers.auth.AuthPsychicLoginController');
router.post(
    '/psychic/login',
    authPsychicLoginController.run.bind(authPsychicLoginController)
);

const authPsychicChangePasswordController: AuthPsychicChangePasswordController = container.get('Apps.mmc.controllers.auth.AuthPsychicChangePasswordController');
router.patch(
    '/psychic/change-password',
    CheckAuthentication,
    authPsychicChangePasswordController.run.bind(authPsychicChangePasswordController)
);

export default router;
