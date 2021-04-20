import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {VideoEntity} from "../../video/model/video.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class TagEntity {
    @ApiProperty({ example: 1, description: "Tag's ID" })
    @PrimaryGeneratedColumn()
    readonly id: string;
    @ApiProperty({ example: "fantastic", description: "Tag's name" })
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
