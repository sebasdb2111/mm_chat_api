import {Transaction}         from '../domain/entity/Transaction';
import TransactionRepository from '../domain/TransactionRepository';
import TransactionCreateDto  from '../domain/dto/TransactionCreateDto';
import {Customer}            from '../../customers/domain/entity/Customer';
import CustomerGet           from '../../customers/application/CustomerGet';
import {PaymentMethod}       from '../../paymentMethod/domain/entity/PaymentMethod';
import PaymentMethodGet      from '../../paymentMethod/application/PaymentMethodGet';
import CreditCreateDto       from '../../credits/domain/dto/CreditCreateDto';
import CreditCreate          from '../../credits/application/CreditCreate';
import {PsychicOffer}        from '../../psychicOffers/domain/entity/PsychicOffer';
import PsychicOfferGet       from '../../psychicOffers/application/PsychicOfferGet';

export default class TransactionCreate
{
    private repository: TransactionRepository;
    private customerGet: CustomerGet;
    private paymentMethodGet: PaymentMethodGet;
    private creditCreate: CreditCreate;
    private psychicOfferGet: PsychicOfferGet;

    constructor(
        repository: TransactionRepository,
        customerGet: CustomerGet,
        paymentMethodGet: PaymentMethodGet,
        creditCreate: CreditCreate,
        psychicOfferGet: PsychicOfferGet
    )
    {
        this.repository       = repository;
        this.customerGet      = customerGet;
        this.paymentMethodGet = paymentMethodGet;
        this.creditCreate     = creditCreate;
        this.psychicOfferGet  = psychicOfferGet;
    }

    async run(transactionDto: TransactionCreateDto): Promise<void>
    {
        try {
            const customer: Customer         = await this.customerGet.run(transactionDto.customerId);
            const psychicOffer: PsychicOffer = await this.psychicOfferGet.run(transactionDto.psychicOfferId);
            // Llamada a api de pago (paypal, etc).
            // Segun la llamada de y respuesta de las apis, moldear entidad e inserccion.

            const paymentMethod: PaymentMethod = await this.paymentMethodGet.run(transactionDto.paymentMethodId);
            const transaction: Transaction     = new Transaction();
            transaction.customer               = customer;
            transaction.total                  = psychicOffer.offer.price;
            transaction.paymentMethod          = paymentMethod;
            transaction.psychicOffer           = psychicOffer;

            const transactionSave: Transaction = await this.repository.save(transaction);

            // Si la respuesta de PayPal o de plataforma de pago por tajeta es OK en tonces crear credito.
            const createCreditDto: CreditCreateDto = new CreditCreateDto(
                (psychicOffer.offer.type === 'TIME') ? psychicOffer.offer.quantity : null,
                (psychicOffer.offer.type === 'COIN') ? psychicOffer.offer.quantity : null,
                psychicOffer.psychic.id,
                transactionDto.customerId,
                transactionSave.id
            );

            await this.creditCreate.run(createCreditDto);
        }
        catch (error) {
            Promise.reject(error);
        }
    }
}