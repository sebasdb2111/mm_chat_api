export default class User {
  readonly username: string;
  readonly password: string;

  constructor(name: string, password: string) {
    this.username = name;
    this.password = password;
  }
}
