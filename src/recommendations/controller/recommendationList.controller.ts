import {RecommendationListService} from "../service/recommendationList.service";
import {Body, Controller, Delete, Get, Param, Put} from "@nestjs/common";

@Controller('/api/v1/account')
export class RecommendationListController {

    constructor(private recService: RecommendationListService) {
    }

    //Get recommendations
    @Get(":idAccount/user/:idUser/recommendations")
    getRec(@Param("idAccount") idAccount, @Param("idUser") idUser){
        return this.recService.getListVideos(idAccount,idUser)
    }

    //Add video to recommendation list
    @Put(":idAccount/user/:idUser/recommendations")
    updateRec(@Param("idAccount") idAccount, @Param("idUser") idUser, @Body("idVideo") idVideo){
        return this.recService.addToList(idAccount,idUser,idVideo)
    }

    //Remove video from recommendation list
    @Delete(":idAccount/user/:idUser/recommendations")
    removeVideoFromList(@Param("idAccount") idAccount, @Param("idUser") idUser, @Body("idVideo") idVideo){
        return this.recService.removeFromlist(idAccount,idUser,idVideo)
    }

}
