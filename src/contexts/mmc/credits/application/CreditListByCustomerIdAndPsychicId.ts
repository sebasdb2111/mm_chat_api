import CreditRepository from '../domain/CreditRepository';
import {IFindAndSumCreditsByCustomerAndPsychic} from '../domain/interfaces/IFindAndSumCreditsByCustomerAndPsychic';

export default class CreditListByCustomerIdAndPsychicId {
	private repository: CreditRepository;

	constructor(repository: CreditRepository)
    {
		this.repository = repository;
	}

	async run(customerId: number, psychicId: number): Promise<IFindAndSumCreditsByCustomerAndPsychic>
    {
		try {
			const findAndSumCredits: any = await this.repository.findAndSumCreditsByCustomerAndPsychic(customerId, psychicId);

			const creditAvailabilityPerCustomerAndPsychic: IFindAndSumCreditsByCustomerAndPsychic = {
				customer: {
					id: findAndSumCredits.customer_id,
					username: findAndSumCredits.customer_username,
					firstName: findAndSumCredits.customer_firstName,
					lastName: findAndSumCredits.customer_lastName,
					isActive: findAndSumCredits.customer_isActive
				},
				psychic: {
					id: findAndSumCredits.psychic_id,
					username: findAndSumCredits.psychic_username,
					firstName: findAndSumCredits.psychic_firstName,
					lastName: findAndSumCredits.psychic_lastName,
					isActive: findAndSumCredits.psychic_isActive
				},
				availableCoins: Number(!findAndSumCredits.totalCoins) ? null : Number(findAndSumCredits.totalCoins),
				availableTime: Number(!findAndSumCredits.totalTime) ? null : Number(findAndSumCredits.totalTime)
			};

			return Promise.resolve(creditAvailabilityPerCustomerAndPsychic);
		} catch (error) {
			return Promise.reject(error);
		}
	}
}