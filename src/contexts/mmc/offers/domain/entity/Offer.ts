import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn, OneToMany
}                      from 'typeorm';
import {IsNumber}      from 'class-validator';
import {PsychicOffers} from '../../../psychicOffers/domain/entity/PsychicOffers';
import {Transaction}   from '../../../trasnsactions/domain/entity/Transaction';

export enum PaymentTypeEnum
{
    TIME = 'TIME',
    COIN = 'COIN',
}

@Entity()
@Unique(['id'])
export class Offer
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type   : 'enum',
        enum   : PaymentTypeEnum,
        default: PaymentTypeEnum.COIN
    })
    typePayment: string;

    @Column()
    @IsNumber()
    price: number;

    @Column()
    @IsNumber()
    quantity: number;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(type => PsychicOffers, psychicOffer => psychicOffer.offer)
    psychicOffers: PsychicOffers[];

    @OneToMany(type => Transaction, transaction => transaction.offer)
    transactions: Transaction[];
}
