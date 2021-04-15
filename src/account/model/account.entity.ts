import {
    BeforeInsert,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn, Unique
} from 'typeorm';
import {PlanEntity} from "../../plan/model/plan.entity";
import {JoinColumn} from "typeorm";
import {UserEntity} from "../../user/model/user.entity";
import {VideoEntity} from "../../video/model/video.entity";
import {Exclude} from "class-transformer";

function IsEmail() {

}

@Entity()
export class AccountEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    readonly created_at: Date;
    @Column()
    next_bill_date: Date;
    @Column()
    username: string;
    @Column()
    password: string;
    @Column()
    first_name: string;
    @Column()
    last_name: string;
    @Column()
    country: string;
    @Column({unique: true})
    email: string;


    @BeforeInsert()
    emailToLowerCase(){
        this.email = this.email.toLowerCase()
    }

    @OneToOne(type => PlanEntity, plan => plan.account)
    @JoinColumn({name: 'planId',referencedColumnName: "id" })
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
        id: number,
        created_at: Date,
        next_bill_date: Date,
        username:string,
        password: string,
        first_name: string,
        last_name: string,
        country: string,
        email: string,

    ) {
        this.id = id;
        this.created_at = created_at;
        this.next_bill_date = next_bill_date;
        this.username = username;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;
        this.country = country;
        this.email = email;
    }
}
