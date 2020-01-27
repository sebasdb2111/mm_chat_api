import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToOne,
    JoinColumn,
    OneToMany
}                    from 'typeorm';
import {Offer}       from '../../../offers/domain/entity/Offer';
import {Psychic}     from '../../../psychics/domain/entity/Psychic';
import {Transaction} from '../../../transactions/domain/entity/Transaction';

@Entity()
@Unique(['id'])
export class PsychicOffer
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(type => Offer, offer => offer.psychicOffers, {nullable: false})
    offer: Offer;

    @OneToOne(type => Psychic, {nullable: false})
    @JoinColumn()
    psychic: Psychic;

    @OneToMany(type => Transaction, transaction => transaction.psychicOffer)
    transactions: Transaction[];
}
