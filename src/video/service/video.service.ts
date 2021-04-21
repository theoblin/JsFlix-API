import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {AccountEntity} from "../../account/model/account.entity";
import {Repository} from "typeorm";
import {PlanEntity} from "../../plan/model/plan.entity";
import {VideoEntity} from "../model/video.entity";
import {AuthService} from "../../auth/service/auth.service";
import {VideoDto} from "../dto/video.dto";
import {TagEntity} from "../../tag/model/tag.entity";

@Injectable()
export class VideoService {

    constructor(
        @InjectRepository(VideoEntity)
        private videoEntityRepository: Repository<VideoEntity>,
        @InjectRepository(TagEntity)
        private tagEntityRepository: Repository<TagEntity>,
    ) {}

    //Get an account videos
    async getVideos(id) {
        const videosArray = []
         await this.videoEntityRepository.createQueryBuilder("video")
             .leftJoinAndSelect("video.account", "account")
             .leftJoinAndSelect("video.tag", "tag")
             .where("account.id = :id", {id: id.id})
             .getMany().then(videos => {
                 videos.forEach((video) => videosArray.push(this.convertToVideoDto(video)))
            })
        return videosArray
    }

    async getOneVideo(idVideo, idAccount){
        console.log("Account: " + idAccount,  "Video: " + idVideo)

        return await this.videoEntityRepository.createQueryBuilder("video")
            .leftJoinAndSelect("video.account", "account")
            .where("account.id = :id", {id: idAccount})
            .where("video.id = :id", {id: idVideo})
            .getOne()




    }

    convertToVideoDto(video: any) {
        return  new VideoDto(video.id,  video.add_at,video.title, video.miniature_url,video.content_url, video.description, video.rating,  video.lang, video.tag)
    }
}
