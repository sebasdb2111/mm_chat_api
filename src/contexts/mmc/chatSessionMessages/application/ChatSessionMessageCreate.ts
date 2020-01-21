import {ChatSessionMessage}         from '../domain/entity/ChatSessionMessage';
import ChatSessionMessageRepository from '../domain/ChatSessionMessageRepository';
import ChatSessionMessageCreateDto  from '../domain/dto/ChatSessionMessageCreateDto';
import {Psychic}                    from '../../psychics/domain/entity/Psychic';
import {Customer}                   from '../../customers/domain/entity/Customer';
import {User}                       from '../../users/domain/entity/User';
import UserGet                      from '../../users/application/UserGet';
import CustomerGet                  from '../../customers/application/CustomerGet';
import PsychicGet                   from '../../psychics/application/PsychicGet';

export default class ChatSessionMessageCreate
{
    private repository: ChatSessionMessageRepository;
    private customerGet: CustomerGet;
    private psychicGet: PsychicGet;
    private userGet: UserGet;

    constructor(
        repository: ChatSessionMessageRepository,
        customerGet: CustomerGet,
        psychicGet: PsychicGet,
        userGet: UserGet
    )
    {
        this.repository         = repository;
        this.customerGet = customerGet;
        this.psychicGet  = psychicGet;
        this.userGet     = userGet;
    }

    async run(chatSessionMessageDto: ChatSessionMessageCreateDto): Promise<ChatSessionMessage>
    {
        const customer: Customer = await this.customerGet.run(chatSessionMessageDto.customerId);
        const psychic: Psychic   = await this.psychicGet.run(chatSessionMessageDto.psychicId);
        const user: User         = chatSessionMessageDto.userId ? await this.userGet.run(chatSessionMessageDto.userId) : null;

        const chatSessionMessage: ChatSessionMessage = new ChatSessionMessage();
        chatSessionMessage.message                   = chatSessionMessageDto.message;
        chatSessionMessage.deleted                   = false;
        chatSessionMessage.customer                  = customer;
        chatSessionMessage.psychic                   = psychic;
        chatSessionMessage.user                      = user;

        const newChatSessionMessage: ChatSessionMessage = await this.repository.save(chatSessionMessage);

        return Promise.resolve(newChatSessionMessage);
    }
}
