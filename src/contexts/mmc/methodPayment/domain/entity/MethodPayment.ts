import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique, OneToMany,
}                    from 'typeorm';
import {Transaction} from '../../../trasnsactions/domain/entity/Transaction';

export enum MethodPaymentTypeEnum
{
    PAYPAL     = 'PAYPAL',
    CREDITCARD = 'CREDITCARD',
}

@Entity()
@Unique(['id'])
export class MethodPayment
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type   : 'enum',
        enum   : MethodPaymentTypeEnum,
        default: MethodPaymentTypeEnum.PAYPAL
    })
    method: string;

    @OneToMany(type => Transaction, transaction => transaction.methodPayment)
    transactions: Transaction[];
}
