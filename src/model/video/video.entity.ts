import {Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {TagEntity} from "../tag/tag.entity";
import {AccountEntity} from "../account/account.entity";

@Entity()
export class VideoEntity {
    @PrimaryGeneratedColumn()
    readonly id: string;
    @Column()
    readonly add_at: Date;
    @Column()
    readonly title: string;
    @Column()
    readonly miniature_url: string;
    @Column()
    readonly description: string;
    @Column()
    readonly rating: string;

    @ManyToMany(type => TagEntity, tag => tag.video)
    tag: TagEntity[];
    @ManyToMany(type => AccountEntity, account => account.video)
    account: AccountEntity[];

    constructor(
        id: string,
        add_at: Date,
        title: string,
        miniature_url: string,
        description: string,
        rating: string,
    ) {
        this.id = id;
        this.add_at = add_at;
        this.title = title;
        this.miniature_url = miniature_url;
        this.description = description;
        this.rating = rating;
    }
}
