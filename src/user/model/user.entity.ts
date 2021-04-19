import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {AccountEntity} from "../../account/model/account.entity";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    readonly id: number;
    @Column()
    readonly created_at: Date;
    @Column()
    readonly icon_url: string;
    @Column()
    readonly username: string;
    @Column()
    readonly is_child: boolean;

    @ManyToOne(type => AccountEntity, account => account.user)
    @JoinColumn({name: 'accountId'})
    account: UserEntity[];

    constructor(
        id: number,
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
