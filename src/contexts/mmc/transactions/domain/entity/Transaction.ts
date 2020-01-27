import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne
}                      from 'typeorm';
import {Credit}        from '../../../credits/domain/entity/Credit';
import {PaymentMethod} from '../../../paymentMethod/domain/entity/PaymentMethod';
import {Customer}      from '../../../customers/domain/entity/Customer';
import {PsychicOffer}  from '../../../psychicOffers/domain/entity/PsychicOffer';

@Entity()
@Unique(['id'])
export class Transaction
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    total: number;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(type => PaymentMethod, paymentMethod => paymentMethod.transactions, {nullable: false})
    paymentMethod: PaymentMethod;

    @ManyToOne(type => PsychicOffer, offer => offer.transactions, {nullable: false})
    psychicOffer: PsychicOffer;

    @ManyToOne(type => Customer, customer => customer.transactions, {nullable: false})
    customer: Customer;

    @OneToMany(type => Credit, credit => credit.transaction)
    credits: Credit[];
}
