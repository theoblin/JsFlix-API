import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {AccountEntity} from "../../account/model/account.entity";
import {Repository} from "typeorm";
import {PlanEntity} from "../../plan/model/plan.entity";
import {VideoEntity} from "../model/video.entity";
import {AuthService} from "../../auth/service/auth.service";
import {VideoDto} from "../dto/video.dto";

@Injectable()
export class VideoService {

    constructor(
        @InjectRepository(VideoEntity)
        private videoEntityRepository: Repository<VideoEntity>,
    ) {}

    async getVideos(id) {
        const videosArray = []
        return await this.videoEntityRepository.createQueryBuilder("video")
            .leftJoinAndSelect("video.account", "account")
            .where("account.id = :id", {id: id.id})
            .getMany().then(e => {
                e.forEach((est) => this.convertToVideoDto(est))
            })
    }

    convertToVideoDto(video: any) {
        return  new VideoDto(video.id,  video.add_at,video.title, video.miniature_url, video.description, video.rating, video.content_url, video.lang)
    }
}
