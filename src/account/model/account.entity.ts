import {
    BeforeInsert,
    Column,
    Entity,
    JoinTable,
    ManyToMany, ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';
import {PlanEntity} from "../../plan/model/plan.entity";
import {JoinColumn} from "typeorm";
import {UserEntity} from "../../user/model/user.entity";
import {VideoEntity} from "../../video/model/video.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class AccountEntity {
    @ApiProperty({ example: 1, description: "Account's ID" })
    @PrimaryGeneratedColumn()
    id: number;
    @ApiProperty({ example: "2021-01-01", description: 'Creation date of the account' })
    @Column()
    readonly created_at: Date;
    @ApiProperty({ example: "2021-02-01", description: 'Date of the next billing' })
    @Column()
    next_bill_date: Date;
    @ApiProperty({ example: "Jean17", description: 'Account username' })
    @Column()
    username: string;
    @ApiProperty({ example: "Azerty123", description: 'Account password' })
    @Column()
    password: string;
    @ApiProperty({ example: "Jean", description: 'First name of owner' })
    @Column()
    first_name: string;
    @ApiProperty({ example: "Valjean", description: 'Last name of owner' })
    @Column()
    last_name: string;
    @ApiProperty({ example: "France", description: 'Country of owner' })
    @Column()
    country: string;
    @ApiProperty({ example: "jeanValjean@gmail.com", description: 'email of owner' })
    @Column({unique: true})
    email: string;

    @BeforeInsert()
    emailToLowerCase(){
        this.email = this.email.toLowerCase()
    }
    @ApiProperty({ description: 'Account Plan' })
    @ManyToOne(type => PlanEntity, plan => plan.account)
    @JoinColumn({name: 'planId',referencedColumnName: "id" })
    plan: PlanEntity;

    @OneToMany(type => UserEntity, user => user.account)
    user: UserEntity

    @ApiProperty({ description: 'Account Videos' })
    @ManyToMany( type => VideoEntity, video => video.account)
    @JoinTable({
        name: "video_account", // table name for the junction table of this relation
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
