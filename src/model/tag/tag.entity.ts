import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {VideoEntity} from "../video/video.entity";
import {PlanEntity} from "../plan/plan.entity";

@Entity()
export class TagEntity {
    @PrimaryGeneratedColumn()
    readonly id: string;
    @Column()
    readonly name: string;

    @ManyToMany(type => VideoEntity, video => video.tag)
    @JoinTable({
        name: "video_tags", // table name for the junction table of this relation
        joinColumn: {
            name: "video",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "tag",
            referencedColumnName: "id"
        }
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
