import {InjectRepository} from "@nestjs/typeorm";
import {RecommendationListEntity} from "../model/recommendationList.entity";
import {Repository} from "typeorm";
import {VideoService} from "../../video/service/video.service";
import {BadRequestException, NotFoundException} from "@nestjs/common";

export class RecommendationListService{

    constructor(@InjectRepository(RecommendationListEntity)
                private readonly recEntityRepository: Repository<RecommendationListEntity> ,
                private readonly videoService: VideoService,
                ) {
    }

    //Get the videos of list
    async getListVideos(idAccount, idUser){
        return await this.getListUser(idAccount, idUser).then( list => {
            return this.recEntityRepository.findOne(list.id, {relations: ['video']})
        }).catch(e => {
            throw new BadRequestException(this.errorhandle(idUser,idAccount, null,"find.list.videos", 400))
        })
    }

    //Get the user of list
    async getListUser(idAccount, idUser){
        return await this.recEntityRepository.createQueryBuilder("rec")
            .leftJoinAndSelect("rec.user", "user")
            .where("user.id = :id", {id: idUser})
            .getOne()
            .catch(error => {
                    throw new BadRequestException(this.errorhandle(idUser,idAccount,"find.list.user", null , 400))
                })
    }

    //Add new video in list
    async addToList(idAccount, idUser, idVideo){
        const video = await this.videoService.getOneVideo(idVideo,idAccount)
        if(!video){
            throw new NotFoundException(this.errorhandle(idUser,idAccount,idVideo, "find.video", 404) )
        }
        return await this.getListVideos(idAccount,idUser).then(list => {
            list.video.push(video)
            return this.recEntityRepository.save(list)
        })
    }

    //Remove video from list
    async removeFromlist(idAccount, idUser, idVideo){
        return await this.getListVideos(idAccount,idUser).then(list => {
           list.video.splice(list.video.map(video => video.id).indexOf(idVideo), 1)
            return this.recEntityRepository.save(list)
        })
    }

    errorhandle(user:number,account:number,video=null,action:string,status:number,data=null){
        return {
            user: user,
            account: account,
            video: video,
            action:action,
            status: status,
            data:data
        }
    }

}
