import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn, OneToMany, ManyToOne
}                      from 'typeorm';
import {Credit}        from "../../../credits/domain/entity/Credit";
import {Offer}         from "../../../offers/domain/entity/Offer";
import {MethodPayment} from "../../../methodPayment/domain/entity/MethodPayment";
import {CurrencyEnum}  from "../../../../shared/domain/CurrencyEnum";

@Entity()
@Unique(['id'])
export class Transaction
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    total: number;

    @Column({
        type: 'enum',
        enum: CurrencyEnum,
        default: CurrencyEnum.EURO
    })
    currency: CurrencyEnum;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(type => MethodPayment, methodPayment => methodPayment.transactions, {nullable: false})
    methodPayment: MethodPayment;

    @ManyToOne(type => Offer, offer => offer.transactions, {nullable: false})
    offer: Offer;

    @OneToMany(type => Credit, credit => credit.transaction)
    credits: Credit[];
}
