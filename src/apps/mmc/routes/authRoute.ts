import {Router}                               from 'express';
import container                              from '../config/dependency-injection';
import {checkAuthentication}                  from '../../../contexts/shared/application/checkAuthentication';
import {checkRole}                            from '../../../contexts/shared/application/checkRole';
import {AuthUserLoginController}              from '../controllers/auth/user/AuthUserLoginController';
import {AuthUserChangePasswordController}     from '../controllers/auth/user/AuthUserChangePasswordController';
import {AuthCustomerLoginController}          from '../controllers/auth/customer/AuthCustomerLoginController';
import {AuthCustomerChangePasswordController} from '../controllers/auth/customer/AuthCustomerChangePasswordController';
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
    checkAuthentication,
    checkRole([UserRoleEnum.ADMIN, UserRoleEnum.ANIMATOR]),
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
    checkAuthentication,
    checkRole([UserRoleEnum.ADMIN, UserRoleEnum.ANIMATOR]),
    authCustomerChangePasswordController.run.bind(authCustomerChangePasswordController)
);

export default router;
