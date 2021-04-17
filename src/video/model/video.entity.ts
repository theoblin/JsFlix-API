import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {TagEntity} from "../../tag/model/tag.entity";
import {AccountEntity} from "../../account/model/account.entity";

@Entity()
export class VideoEntity {
    @PrimaryGeneratedColumn()
    readonly id: number;
    @Column()
    readonly add_at: Date;
    @Column()
    readonly title: string;
    @Column()
    readonly miniature_url: string;
    @Column()
    readonly content_url: string;
    @Column()
    readonly description: string;
    @Column()
    readonly rating: string;
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
