import { Request, Response } from "express";
import AuthLogin from "../../../../contexts/mmc/auth/application/AuthLogin";
import * as httpStatus from "http-status";
import Controller from "../Controller";
import UserAlreadyExists from "../../../../contexts/mmc/users/domain/UserAlreadyExists";

export class AuthLoginController implements Controller {
  constructor(private authLogin: AuthLogin) {}

  async run(req: Request, res: Response) {
    const username: string = req.params.id;
    const password: string = req.body.name;

    try {
      await this.authLogin.run(username, password);
      // TODO: meter un return
    } catch (e) {
      if (e instanceof UserAlreadyExists) {
        res.status(httpStatus.BAD_REQUEST).send(e.message);
      } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(e);
      }
    }

    res.status(httpStatus.ACCEPTED).send();
  }
}
