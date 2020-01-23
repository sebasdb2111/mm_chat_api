import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn, ManyToOne, IsNull
} from 'typeorm';
import {IsNumber, IsOptional} from 'class-validator';
import {Psychic}              from '../../../psychics/domain/entity/Psychic';
import {Customer}             from '../../../customers/domain/entity/Customer';

@Entity()
@Unique(['id'])
export class Credit
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true
    })
    @IsNumber()
    time: number;

    @Column()
    @IsNumber()
    coins: number;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(type => Customer, customer => customer.credits, {nullable: false})
    @IsOptional()
    customer: Customer;

    @ManyToOne(type => Psychic, psychic => psychic.credits, {nullable: true})
    @IsOptional()
    psychic: Psychic;

}


