import {Router}                       from 'express';
import container                      from '../config/dependency-injection';
import {AuthLoginController}          from '../controllers/auth/AuthLoginController';
import {AuthChangePasswordController} from '../controllers/auth/AuthChangePasswordController';

const router = Router();

const authLoginController: AuthLoginController = container.get('Apps.mmc.controllers.auth.AuthLoginController');
router.post('/login', authLoginController.run.bind(authLoginController));

const authChangePasswordController: AuthChangePasswordController = container.get('Apps.mmc.controllers.auth.AuthChangePasswordController');
router.patch('/change-password', authChangePasswordController.run.bind(authChangePasswordController));

export default router;
