import CreditRepository from '../domain/CreditRepository';
import {Credit} from '../domain/entity/Credit';
import {CostPerMensajeEnum} from '../../shared/domain/enum/CostPerMensajeEnum';

export default class CreditDecrementCoinsPerMessage {
	private repository: CreditRepository;

	constructor(
		repository: CreditRepository,
	) {
		this.repository = repository;
	}

	async run(customerId: number, psychicId: number): Promise<void> {
		try {
			const creditList: Credit[] = await this.repository.findByCustomerAndPsychic(customerId, psychicId);

			let costMessage = CostPerMensajeEnum.COIN;

			creditList.forEach(async credit => {
				if (costMessage > 0 && credit.coins > 0) {
					const coinsDecrement: number = costMessage >= credit.coins ? credit.coins : costMessage;
					costMessage -= coinsDecrement;
					await this.repository.decrementCoinsByCreditId(credit.id, coinsDecrement);
				}
			});
		} catch (error) {
			Promise.reject(error);
		}
	}
}