import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {VideoEntity} from "../../video/model/video.entity";

@Entity()
export class TagEntity {
    @PrimaryGeneratedColumn()
    readonly id: string;
    @Column()
    readonly name: string;

    @ManyToMany(type => VideoEntity)
    @JoinTable({
        name: "video_tags", // table name for the junction table of this relation
    })
    video: VideoEntity[];

    constructor(
        id: string,
        name: string,

    ) {
        this.id = id;
        this.name = name;
    }
}
