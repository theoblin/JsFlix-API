import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {TagEntity} from "../../tag/model/tag.entity";
import {AccountEntity} from "../../account/model/account.entity";
import {ApiProperty} from "@nestjs/swagger";
import {RecommendationListEntity} from "../../recommendations/model/recommendationList.entity";

@Entity()
export class VideoEntity {
    @ApiProperty({ example: 1, description: "Video's ID" })
    @PrimaryGeneratedColumn()
     id: number;
    @ApiProperty({ example: "2020-01-01", description: "Creation date" })
    @Column()
    readonly add_at: Date;
    @ApiProperty({ example: "Spider-man", description: "Video title" })
    @Column()
    readonly title: string;
    @ApiProperty({ example: "Path/to/url", description: "Video miniature url" })
    @Column()
    readonly miniature_url: string;
    @ApiProperty({ example: "Path/to/url", description: "Video source url" })
    @Column()
    readonly content_url: string;
    @ApiProperty({ example: "Fantastic movie", description: "Video description" })
    @Column()
    readonly description: string;
    @ApiProperty({ example:5, description: "Video rate" })
    @Column()
    readonly rating: string;
    @ApiProperty({ example:"fr", description: "Video lang" })
    @Column()
    readonly lang: string;

    @ManyToMany(type => TagEntity, tag => tag.video)
    @JoinTable({
        name: "video_tags"})
    tag: TagEntity[];

    @ManyToMany(type => AccountEntity, account => account.video)
    @JoinTable({
        name: "video_account"})
    account: AccountEntity[];

    @ManyToMany(type => RecommendationListEntity, {cascade: true})
    @JoinTable({
        name: "video_recommendation_list" // table name for the junction table of this relation
    })
    rec: RecommendationListEntity;


    constructor(
        id: number,
        add_at: Date,
        title: string,
        miniature_url: string,
        content_url: string,
        description: string,
        rating: string,
        lang: string,
    ) {
        this.id = id;
        this.add_at = add_at;
        this.title = title;
        this.miniature_url = miniature_url;
        this.content_url = content_url;
        this.description = description;
        this.rating = rating;
        this.lang = lang;
    }
}
