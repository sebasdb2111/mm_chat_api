import {ChatSession}         from '../domain/entity/ChatSession';
import ChatSessionRepository from '../domain/ChatSessionRepository';
import ChatSessionCreateDto  from '../domain/dto/ChatSessionCreateDto';
import {Psychic}             from '../../psychics/domain/entity/Psychic';
import {Customer}            from '../../customers/domain/entity/Customer';
import {User}                from '../../users/domain/entity/User';
import UserGet               from '../../users/application/UserGet';
import CustomerGet           from '../../customers/application/CustomerGet';
import PsychicGet            from '../../psychics/application/PsychicGet';
import ChatSessionNotExistException from '../../shared/domain/exceptions/ChatSessionNotExistsException';
import ChatSessionAlreadyExistsException from '../domain/exceptions/ChatSessionAlreadyExistsException';

export default class ChatSessionCreate
{
    private repository: ChatSessionRepository;
    private customerGet: CustomerGet;
    private psychicGet: PsychicGet;
    private userGet: UserGet;

    constructor(
        repository: ChatSessionRepository,
        customerGet: CustomerGet,
        psychicGet: PsychicGet,
        userGet: UserGet
    )
    {
        this.repository  = repository;
        this.customerGet = customerGet;
        this.psychicGet  = psychicGet;
        this.userGet     = userGet;
    }

    async run(chatSessionDto: ChatSessionCreateDto): Promise<ChatSession>
    {
        try {
            const customer: Customer = await this.customerGet.run(chatSessionDto.ownerId);
            const psychic: Psychic   = await this.psychicGet.run(chatSessionDto.psychicId);
            const user: User         = chatSessionDto.userId ? await this.userGet.run(chatSessionDto.userId) : null;

            await this.guard(customer.id, psychic.id);

            const chatSession: ChatSession = new ChatSession();
            chatSession.isActive           = true;
            chatSession.owner              = customer;
            chatSession.psychic            = psychic;
            chatSession.user               = user;

            const newChatSession: ChatSession = await this.repository.save(chatSession);

            return Promise.resolve(newChatSession);
        }
        catch (error) {
            return Promise.reject(error)
        }
    }

    async guard(customer: number, psychic: number): Promise<void>
    {
        const chatSession: ChatSession = await this.repository.findByCustomerAndPsychic(customer, psychic);
        console.log('XXXXXXXXXXXXX', chatSession)
        if (chatSession) {
            throw new ChatSessionAlreadyExistsException(psychic);
        }
    }
}
