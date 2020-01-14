// import container from '../config/dependency-injection';
import { Router } from "express";
import { checkJwt } from "../../../contexts/shared/middlewares/checkJwt";
import AuthController from "../controllers/auth/AuthController";
// import {AuthLoginController} from '../controllers/AuthLoginController';

const router = Router();
// const authLoginController: AuthLoginController = container.get('apps.mmc.controllers.AuthLoginController');
// router.post('/login', authLoginController.run);

router.post("/change-password", [checkJwt], AuthController.changePassword);

export default router;
