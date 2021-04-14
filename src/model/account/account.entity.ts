import {Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {PlanEntity} from "../plan/plan.entity";
import {JoinColumn} from "typeorm";
import {UserEntity} from "../user/user.entity";
import {VideoEntity} from "../video/video.entity";

@Entity()
export class AccountEntity {
    @PrimaryGeneratedColumn()
    readonly id: string;
    @Column()
    readonly created_at: Date;
    @Column()
    readonly next_bill_date: Date;
    @Column()
    readonly username: string;
    @Column()
    readonly password: string;
    @Column()
    readonly first_name: string;
    @Column()
    readonly last_name: string;
    @Column()
    readonly country: string;

    @OneToOne(type => PlanEntity, plan => plan.account)
    @JoinColumn({name: 'plan_id'})
    plan: PlanEntity[];

    @OneToMany(type => UserEntity, user => user.account)
    user: UserEntity[]

    @ManyToMany( type => VideoEntity, video => video.account)
    @JoinTable({
        name: "video_account", // table name for the junction table of this relation
        joinColumn: {
            name: "video",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "account",
            referencedColumnName: "id"
        }
    })
    video: VideoEntity[]

    constructor(
        id: string,
        created_at: Date,
        next_bill_date: Date,
        username:string,
        password: string,
        first_name: string,
        last_name: string,
        country: string,
    ) {
        this.id = id;
        this.created_at = created_at;
        this.next_bill_date = next_bill_date;
        this.username = username;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;
        this.country = country;
    }
}
