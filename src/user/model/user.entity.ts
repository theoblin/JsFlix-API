import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {PlanEntity} from "../../plan/model/plan.entity";
import {AccountEntity} from "../../account/model/account.entity";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    readonly id: string;
    @Column()
    readonly created_at: Date;
    @Column()
    readonly icon_url: string;
    @Column()
    readonly username: string;
    @Column()
    readonly is_child: boolean;

    @OneToOne(type => AccountEntity, account => account.user)
    @JoinColumn({name: 'account_id'})
    account: UserEntity[];

    constructor(
        id: string,
        created_at: Date,
        icon_url: string,
        username: string,
        is_child: boolean,
    ) {
        this.id = id;
        this.created_at = created_at;
        this.icon_url = icon_url;
        this.username = username;
        this.is_child = is_child;
    }
}
