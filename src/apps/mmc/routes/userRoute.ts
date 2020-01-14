import { Router } from "express";
import UserController from "../controllers/UserController";
import { checkJwt } from "../../../contexts/shared/middlewares/checkJwt";
import { checkRole } from "../../../contexts/shared/middlewares/checkRole";
import container from "../config/dependency-injection";
import { UserCreateController } from "../controllers/UserCreateController";

const router = Router();

//Get all users
router.get("/", [checkJwt, checkRole(["ADMIN"])], UserController.listAll);

// Get one users
router.get(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  UserController.getOneById
);

const userCreateController: UserCreateController = container.get(
  "Apps.mmc.controllers.UserCreateController"
);
router.post("/", userCreateController.run.bind(userCreateController));

//Edit one users
router.patch(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  UserController.editUser
);

//Delete one users
router.delete(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  UserController.deleteUser
);

export default router;
