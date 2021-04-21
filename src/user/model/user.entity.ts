import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {AccountEntity} from "../../account/model/account.entity";
import {ApiProperty} from "@nestjs/swagger";
import {RecommendationListEntity} from "../../recommendations/model/recommendationList.entity";

@Entity()
export class UserEntity {
    @ApiProperty({ example: 1, description: "User's name" })
    @PrimaryGeneratedColumn()
    readonly id: number;
    @ApiProperty({ example: "2021-01-01", description: "Creation date of user" })
    @Column()
    readonly created_at: Date;
    @ApiProperty({ example: "Path/of/image", description: "path for user icon" })
    @Column()
    readonly icon_url: string;
    @ApiProperty({ example: "jean18", description: "User's username" })
    @Column()
    readonly username: string;
    @ApiProperty({ example: false, description: "account restrictions" })
    @Column()
    readonly is_child: boolean;

    @ManyToOne(type => AccountEntity, account => account.user)
    @JoinColumn({name: 'accountId'})
    account: UserEntity[];

    @ManyToOne(type => RecommendationListEntity, rec => rec.user)
    @JoinColumn({name: 'listId',referencedColumnName: "id" })
    rec: RecommendationListEntity;

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
