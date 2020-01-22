export default class UserCreateDto
{
    public username: string;
    public password: string;
    public role: string;
    public email: string;
    public firstName: string;
    public lastName: string;

    constructor(
        username: string,
        password: string,
        role: string,
        email: string,
        firstName: string,
        lastName: string,
    )
    {
        this.username  = username;
        this.password  = password;
        this.role      = role;
        this.email     = email;
        this.firstName = firstName;
        this.lastName  = lastName;
    }
}
