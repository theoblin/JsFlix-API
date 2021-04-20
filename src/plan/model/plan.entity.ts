import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {AccountEntity} from "../../account/model/account.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class PlanEntity {
    @ApiProperty({ example: 1, description: 'ID' })
    @PrimaryGeneratedColumn()
    readonly id: string;
    @ApiProperty({ example: 3, description: 'Maximum user for plan' })
    @Column()
    readonly max_user: number;
    @ApiProperty({ example: 10, description: "Plan's price" })
    @Column()
    readonly price: number;

    @OneToMany(type => AccountEntity, account => account.plan)
    account: AccountEntity;

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
