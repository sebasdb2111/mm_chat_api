import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
}                              from 'typeorm';
import {IsBoolean, IsOptional} from 'class-validator';
import {ChatSession}           from '../../../chatSessions/domain/entity/ChatSession';
import {Psychic}               from '../../../psychics/domain/entity/Psychic';
import {User}                  from '../../../users/domain/entity/User';
import {Customer}              from '../../../customers/domain/entity/Customer';

@Entity()
@Unique(['id'])
export class ChatSessionMessage
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message: string;

    @Column()
    @IsBoolean()
    isImage: boolean;

    @Column()
    @IsBoolean()
    deleted: boolean;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(type => ChatSession, chatSession => chatSession.chatSessionMessages, {nullable: false})
    @IsOptional()
    chatSession: ChatSession;

    @ManyToOne(type => Customer, customer => customer.chatSessionMessages, {nullable: true})
    @IsOptional()
    customer: Customer;

    @ManyToOne(type => Psychic, psychic => psychic.chatSessionMessages, {nullable: true})
    @IsOptional()
    psychic: Psychic;

    @ManyToOne(type => User, user => user.chatSessionMessages, {nullable: true})
    @IsOptional()
    user: User;
}
