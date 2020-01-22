import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn, OneToMany
}                                               from 'typeorm';
import {Length, IsNotEmpty, IsEmail, IsBoolean} from 'class-validator';
import * as bcrypt                              from 'bcryptjs';
import PasswordIsNotValidException              from '../../../auth/domain/exceptions/PasswordIsNotValidException';
import {ChatSessionMessage}                     from '../../../chatSessionMessages/domain/entity/ChatSessionMessage';
import {ChatSession}                            from '../../../chatSessions/domain/entity/ChatSession';

@Entity()
@Unique(['id', 'username', 'email'])
export class Psychic
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

    @OneToMany(type => ChatSession, chatSession => chatSession.psychic)
    chatSessions: ChatSession[];

    @OneToMany(type => ChatSessionMessage, messages => messages.psychic)
    chatSessionMessages: ChatSessionMessage[];

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
