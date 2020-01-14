import { User } from "./entity/User";

export default interface UserRepository {
  findOneOrFail(id: number): Promise<User>;
  save(user: User): Promise<User>;
}
