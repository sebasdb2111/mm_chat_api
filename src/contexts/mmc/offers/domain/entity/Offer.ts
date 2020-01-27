import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
}                     from 'typeorm';
import {IsNumber}     from 'class-validator';
import {PsychicOffer} from '../../../psychicOffers/domain/entity/PsychicOffer';
import {CurrencyEnum} from '../../../../shared/domain/CurrencyEnum';

export enum TypeEnum
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
        enum   : TypeEnum,
        default: TypeEnum.COIN
    })
    type: string;

    @Column()
    @IsNumber()
    price: number;


    @Column({
        type   : 'enum',
        enum   : CurrencyEnum,
        default: CurrencyEnum.EURO
    })
    currency: CurrencyEnum;

    @Column()
    @IsNumber()
    quantity: number;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(type => PsychicOffer, psychicOffer => psychicOffer.offer)
    psychicOffers: PsychicOffer[];
}
