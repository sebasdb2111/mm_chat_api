import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn, OneToMany, ManyToOne
}                              from 'typeorm';
import {IsBoolean, IsOptional} from 'class-validator';
import {ChatSessionMessage}    from '../../../chatSessionMessages/domain/entity/ChatSessionMessage';
import {Psychic}               from '../../../psychics/domain/entity/Psychic';
import {Customer}              from '../../../customers/domain/entity/Customer';
import {User}                  from '../../../users/domain/entity/User';

@Entity()
@Unique(['id'])
export class ChatSession
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsBoolean()
    isActive: boolean;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(type => ChatSessionMessage, message => message.chatSession)
    chatSessionMessages: ChatSessionMessage[];

    @ManyToOne(type => Customer, customer => customer.chatSessions, {nullable: false})
    @IsOptional()
    owner: Customer;

    @ManyToOne(type => Psychic, psychic => psychic.chatSessions, {nullable: false})
    @IsOptional()
    psychic: Psychic;

    @ManyToOne(type => User, user => user.chatSessions, {nullable: true})
    @IsOptional()
    user: User;
}


