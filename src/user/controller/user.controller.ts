import {Body, Controller, Delete, Get, Param, Post, Put, UnauthorizedException} from '@nestjs/common';
import {AccountService} from "../../account/service/account.service";
import {VideoService} from "../../video/service/video.service";
import {UserService} from "../service/user/user.service";
import {PlanService} from "../../plan/service/plan/plan.service";

@Controller('/api/v1/account')
export class UserController {

    constructor(private accountService: AccountService, private userService: UserService, private planService:PlanService) {}

    @Post(":id/user")
    createUser(@Body() data, @Param() id){
         return this.userService.createUser(data,id)
    }

    @Get(":id/users")
    getAccountUsers(@Param() id){
        return this.userService.getAccountUsers(id)
    }

    @Get(":idAccount/user/:idUser")
    getOneUser(@Param("idAccount") idAccount ,@Param("idUser") idUser){
        return this.userService.getUser(idAccount,idUser)
    }
    @Put(":idAccount/user/:idUser")
    updateUser(@Param("idAccount") idAccount ,@Param("idUser") idUser, @Body() data){
        return this.userService.updateUser(idAccount,idUser,data)
    }

    @Delete(":idAccount/user/:idUser")
    removeUser(@Param("idAccount") idAccount ,@Param("idUser") idUser){
        return this.userService.deleteUser(idAccount,idUser)
    }



}
