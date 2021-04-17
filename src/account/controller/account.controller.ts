import {Body, Controller, Get, HttpException, Param, Post, Put} from '@nestjs/common';
import {AccountService} from "../service/account.service";
import {AccountEntity} from "../model/account.entity";
import {map} from "rxjs/operators";
import {VideoService} from "../../video/service/video.service";

@Controller('/api/v1/account')
export class AccountController {

    constructor(private accountService: AccountService, private videoService: VideoService) {}

    //Create a new account
    @Post()
    createAccount(@Body() account_data){
         return this.accountService.createAccount(account_data)
    }

    //Return jwt token if credentials are correct
    @Post('login')
    login(@Body() account: AccountEntity) {
            return this.accountService.login(account).pipe(
                map((jwt: string) => {
                    return {access_token: jwt}
                })
            )
        }

    //Update account to change plan
    @Put(':id')
    addPlan(@Body() planId, @Param() id){
        return this.accountService.addPlanToAccount(id,planId)
    }

    //Get one user by ID
    @Get(":id")
    findUserById(@Param() id){
        try{
            return this.accountService.findOne(id)

        }catch (e) {
            throw new HttpException(e,400)
        }
    }

    //Get videos of account
    @Get(':id/videos')
    getVideos(@Param() id){
        return this.videoService.getVideos(id)
    }

}
