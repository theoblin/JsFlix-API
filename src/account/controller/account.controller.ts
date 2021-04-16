import {Body, Controller, Get, HttpException, Param, Post, Put, Query, Res} from '@nestjs/common';
import {AccountService} from "../service/account.service";
import {AccountEntity} from "../model/account.entity";
import {catchError, map} from "rxjs/operators";
import {of} from "rxjs";

@Controller('/api/v1/account')
export class AccountController {

    constructor(private accountService: AccountService) {}

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

    //Get one user by ID
    @Get(":id")
    findUserById(@Param() id){
        try{
            return this.accountService.findOne(id)

        }catch (e) {
            throw new HttpException(e,400)
        }
    }

    @Put(':id')
    addPlan(@Body() planId, @Param() id){
            return this.accountService.addPlanToAccount(id,planId)
    }

}
