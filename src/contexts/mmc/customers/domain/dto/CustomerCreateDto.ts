export default class CustomerCreateDto {
	public username: string;
	public password: string;
	public email: string;
	public firstName: string;
	public lastName: string;
	public dateBirth: Date;

	constructor(
		username: string,
		password: string,
		email: string,
		firstName: string,
		lastName: string,
		dateBirth: Date,
	) {
		this.username  = username;
		this.password  = password;
		this.email     = email;
		this.firstName = firstName;
		this.lastName  = lastName;
		this.dateBirth = dateBirth;
	}
}
