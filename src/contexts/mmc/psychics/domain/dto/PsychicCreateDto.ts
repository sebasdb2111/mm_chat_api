export default class PsychicCreateDto
{
    public username: string;
    public password: string;
    public email: string;
    public firstName: string;
    public lastName: string;

    constructor(
        username: string,
        password: string,
        email: string,
        firstName: string,
        lastName: string,
    )
    {
        this.username  = username;
        this.password  = password;
        this.email     = email;
        this.firstName = firstName;
        this.lastName  = lastName;
    }
}
