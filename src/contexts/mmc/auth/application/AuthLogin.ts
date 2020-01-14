import UserRepository from "../../users/domain/UserRepository";
import * as jwt from "jsonwebtoken";
import { User } from "../../users/domain/entity/User";
import config from "../../../../apps/mmc/config/config";
import { getRepository } from "typeorm";

export default class AuthLogin {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async run(username: string, password: string): Promise<string> {
    try {
      // if (!(username && password)) {
      //     res.status(400).send();
      //     return Promise.reject();
      // }

      const userRepository = getRepository(User);
      const user: User = await userRepository.findOneOrFail({
        where: { username }
      });

      // if (!users.checkIfUnencryptedPasswordIsValid(password)) {
      //     res.status(401).send();
      //     return Promise.reject();
      // }

      return Promise.resolve(
        jwt.sign(
          { userId: user.id, username: user.username },
          config.jwtSecret,
          { expiresIn: "1h" }
        )
      );
    } catch (error) {
      return Promise.reject();
    }
  }
}
