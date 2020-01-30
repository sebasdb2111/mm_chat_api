import {Request, Response} 			  from 'express';
import * as httpStatus                from 'http-status';
import Controller                     from '../Controller';
import CustomerCreate                 from '../../../../contexts/mmc/customers/application/CustomerCreate';
import CustomerCreateDto              from '../../../../contexts/mmc/customers/domain/dto/CustomerCreateDto';
import CustomerAlreadyExistsException from '../../../../contexts/mmc/customers/domain/exceptions/CustomerAlreadyExistsException';

export class CustomerCreateController implements Controller
{
	constructor(private customerCreate: CustomerCreate)
	{
	}

	async run(req: Request, res: Response)
	{
		return new Promise(async (resolve, reject) =>
		{
			try {
				const customerCreateDto: CustomerCreateDto = new CustomerCreateDto(
					req.body.username,
					req.body.password,
					req.body.email,
					req.body.firstName,
					req.body.lastName,
					req.body.dateBirth
				);
				const customer = await this.customerCreate.run(customerCreateDto);

				resolve(res.status(httpStatus.CREATED).send(customer));
			}
			catch (error) {
				let httpStatusError = httpStatus.INTERNAL_SERVER_ERROR;

				if (error instanceof CustomerAlreadyExistsException) {
					httpStatusError = httpStatus.BAD_REQUEST;
				}

				reject(res.status(httpStatusError).send(error.message));
			}
		});
	}
}
