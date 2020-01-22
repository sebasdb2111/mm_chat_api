import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn, OneToMany
}                                                       from 'typeorm';
import {Length, IsNotEmpty, IsEmail, IsEnum, IsBoolean} from 'class-validator';
import * as bcrypt                                      from 'bcryptjs';
import PasswordIsNotValidException                      from '../../../auth/domain/exceptions/PasswordIsNotValidException';
import {UserRoleEnum}                                   from '../../../../shared/domain/UserRoleEnum';
import {ChatSession}                                    from '../../../chatSessions/domain/entity/ChatSession';
import {ChatSessionMessage}                             from '../../../chatSessionMessages/domain/entity/ChatSessionMessage';

@Entity()
@Unique(['id', 'username', 'email'])
export class User
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
    @IsEnum(UserRoleEnum)
    role: string;

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

    @OneToMany(type => ChatSession, chatSession => chatSession.user)
    chatSessions: ChatSession[];

    @OneToMany(type => ChatSessionMessage, messages => messages.user)
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
