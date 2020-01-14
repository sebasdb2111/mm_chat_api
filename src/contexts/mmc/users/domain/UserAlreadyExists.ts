export default class UserAlreadyExists extends Error {
  constructor(userId: string) {
    super(`User ${userId} already exists`);
  }
}
