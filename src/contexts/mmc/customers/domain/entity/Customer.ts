import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
}                                               from 'typeorm';
import {Length, IsNotEmpty, IsEmail, IsBoolean} from 'class-validator';
import * as bcrypt                              from 'bcryptjs';
import PasswordIsNotValidException              from '../../../auth/domain/exceptions/PasswordIsNotValidException';
import {ChatSession}                            from '../../../chatSessions/domain/entity/ChatSession';
import {ChatSessionMessage}                     from '../../../chatSessionMessages/domain/entity/ChatSessionMessage';
import {Credit}                                 from '../../../credits/domain/entity/Credit';
import {Transaction}                            from '../../../transactions/domain/entity/Transaction';

@Entity()
@Unique(['id', 'username', 'email'])
export class Customer
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(4, 20)
    @IsNotEmpty()
    username: string;

    @Column()
    @Length(4, 100)
    @IsNotEmpty()
    password: string;

    @Column()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Column()
    @Length(2, 100)
    @IsNotEmpty()
    firstName: string;

    @Column()
    @Length(2, 100)
    @IsNotEmpty()
    lastName: string;

    @Column()
    @CreateDateColumn()
    lastLogin: Date;

    @Column()
    @IsBoolean()
    isActive: boolean;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(type => Credit, credit => credit.customer)
    credits: Credit[];

    @OneToMany(type => Transaction, transaction => transaction.customer)
    transactions: Transaction[];

    @OneToMany(type => ChatSession, chatSession => chatSession.owner)
    chatSessions: ChatSession[];

    @OneToMany(type => ChatSessionMessage, messages => messages.customer)
    chatSessionMessages: ChatSessionMessage[];

    updateLastLogin(): any
    {
        this.lastLogin = new Date();
    }

    hashPassword(): any
    {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string): boolean
    {
        const isValid: boolean = bcrypt.compareSync(unencryptedPassword, this.password);
        if (!isValid) {
            throw new PasswordIsNotValidException(this.username);
        }

        return true;
    }
}
