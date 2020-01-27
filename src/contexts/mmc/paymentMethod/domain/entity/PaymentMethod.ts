import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique, OneToMany,
}                    from 'typeorm';
import {Transaction} from '../../../transactions/domain/entity/Transaction';

export enum PaymentMethodTypeEnum
{
    PAYPAL     = 'PAYPAL',
    CREDITCARD = 'CREDITCARD',
}

@Entity()
@Unique(['id'])
export class PaymentMethod
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type   : 'enum',
        enum   : PaymentMethodTypeEnum,
        default: PaymentMethodTypeEnum.PAYPAL
    })
    method: string;

    @OneToMany(type => Transaction, transaction => transaction.paymentMethod)
    transactions: Transaction[];
}
