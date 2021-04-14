import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {AccountEntity} from "../account/account.entity";

@Entity()
export class PlanEntity {
    @PrimaryGeneratedColumn()
    readonly id: string;
    @Column()
    readonly max_user: number;
    @Column()
    readonly price: number;

    @OneToMany(type => AccountEntity, account => account.plan)
    account: AccountEntity[];

    constructor(
        id: string,
        price: number,
        max_user: number,

    ) {
        this.id = id;
        this.price = price;
        this.max_user = max_user;
    }
}
