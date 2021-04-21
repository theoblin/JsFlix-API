import {Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {UserEntity} from "../../user/model/user.entity";
import {VideoEntity} from "../../video/model/video.entity";

@Entity()
export class RecommendationListEntity {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @OneToMany( type => UserEntity, user => user.rec)
    user: UserEntity

    @ManyToMany( type => VideoEntity, video => video.rec)
    @JoinTable({
        name: "video_recommendation_list",
    })
    video: VideoEntity[]

    constructor(
        id: number,
    ) {
        this.id = id;
    }
}
