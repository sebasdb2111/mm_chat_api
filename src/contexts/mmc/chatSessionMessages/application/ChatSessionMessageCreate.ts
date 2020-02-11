import {ChatSessionMessage}                     from '../domain/entity/ChatSessionMessage';
import ChatSessionMessageRepository             from '../domain/ChatSessionMessageRepository';
import ChatSessionMessageCreateDto              from '../domain/dto/ChatSessionMessageCreateDto';
import {Customer}                               from '../../customers/domain/entity/Customer';
import {User}                                   from '../../users/domain/entity/User';
import UserGet                                  from '../../users/application/UserGet';
import CustomerGet                              from '../../customers/application/CustomerGet';
import ChatSessionGet                           from '../../chatSessions/application/ChatSessionGet';
import {ChatSession}                            from '../../chatSessions/domain/entity/ChatSession';
import CreditListByCustomerIdAndPsychicId       from '../../credits/application/CreditListByCustomerIdAndPsychicId';
import {IFindAndSumCreditsByCustomerAndPsychic} from '../../credits/domain/interfaces/IFindAndSumCreditsByCustomerAndPsychic';
import {CostPerMensajeEnum}                     from '../../shared/domain/enum/CostPerMensajeEnum';
import {PsychicOffer}                           from '../../psychicOffers/domain/entity/PsychicOffer';
import {TypeOfferEnum}                          from '../../offers/domain/enum/TypeOfferEnum';
import PsychicOfferGet                          from '../../psychicOffers/application/PsychicOfferGet';
import CreditDecrementCoinsPerMessage           from '../../credits/application/CreditDecrementCoinsPerMessage';
import ThereAreNotEnoughFunds                   from '../domain/exceptions/ThereAreNotEnoughFunds';

export default class ChatSessionMessageCreate
{
    private repository: ChatSessionMessageRepository;
    private creditListByCustomerIdAndPsychicId: CreditListByCustomerIdAndPsychicId;
    private creditDecrementCoinsPerMessage: CreditDecrementCoinsPerMessage;
    private chatSessionGet: ChatSessionGet;
    private customerGet: CustomerGet;
    private psychicOfferGet: PsychicOfferGet;
    private userGet: UserGet;

    constructor(
        repository: ChatSessionMessageRepository,
        creditListByCustomerIdAndPsychicId: CreditListByCustomerIdAndPsychicId,
        creditDecrementCoinsPerMessage: CreditDecrementCoinsPerMessage,
        chatSessionGet: ChatSessionGet,
        customerGet: CustomerGet,
        psychicOfferGet: PsychicOfferGet,
        userGet: UserGet
    )
    {
        this.repository                         = repository;
        this.creditListByCustomerIdAndPsychicId = creditListByCustomerIdAndPsychicId;
        this.creditDecrementCoinsPerMessage     = creditDecrementCoinsPerMessage;
        this.chatSessionGet                     = chatSessionGet;
        this.customerGet                        = customerGet;
        this.psychicOfferGet                    = psychicOfferGet;
        this.userGet                            = userGet;
    }

    async run(chatSessionMessageDto: ChatSessionMessageCreateDto): Promise<ChatSessionMessage>
    {
        try {
            const chatSession: ChatSession   = await this.chatSessionGet.run(chatSessionMessageDto.chatSessionId);
            const psychicOffer: PsychicOffer = await this.psychicOfferGet.run(chatSession.owner.id, chatSession.psychic.id);
            const customer: Customer = null === chatSessionMessageDto.customerId || undefined === chatSessionMessageDto.customerId
                ? null
                : await this.customerGet.run(chatSessionMessageDto.customerId);
            const user: User         = (null === chatSessionMessageDto.userId || undefined === chatSessionMessageDto.userId)
                ? null
                : await this.userGet.run(chatSessionMessageDto.userId);

            if (null !== customer) {
				const availableCredits: IFindAndSumCreditsByCustomerAndPsychic = await this.creditListByCustomerIdAndPsychicId.run(
					chatSessionMessageDto.customerId,
					chatSession.psychic.id
				);

				this.guard(psychicOffer, availableCredits);
				await this.creditDecrementCoinsPerMessage.run(customer.id, chatSession.psychic.id);
            }

            const chatSessionMessage: ChatSessionMessage = new ChatSessionMessage();
            chatSessionMessage.message                   = chatSessionMessageDto.message;
            chatSessionMessage.isImage                   = chatSessionMessageDto.isImage;
            chatSessionMessage.deleted                   = false;
            chatSessionMessage.chatSession               = chatSession;
            chatSessionMessage.customer                  = customer;
            chatSessionMessage.psychic                   = psychicOffer.psychic;
            chatSessionMessage.user                      = user;

            const newChatSessionMessage: ChatSessionMessage = await this.repository.save(chatSessionMessage);

            return Promise.resolve(newChatSessionMessage);
        }
        catch (error) {
            return Promise.reject(error)
        }
    }

    private guard(psychicOffer: PsychicOffer, availableCredits: IFindAndSumCreditsByCustomerAndPsychic)
    {
        if (psychicOffer.offer.type === TypeOfferEnum.COIN && availableCredits.availableCoins < CostPerMensajeEnum.COIN) {
            throw new ThereAreNotEnoughFunds();
        }
    }
}
