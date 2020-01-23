import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn, ManyToOne, OneToOne, JoinColumn
}                from 'typeorm';
import {Offer}   from '../../../offers/domain/entity/Offer';
import {Psychic} from '../../../psychics/domain/entity/Psychic';

@Entity()
@Unique(['id'])
export class PsychicOffers
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
}
