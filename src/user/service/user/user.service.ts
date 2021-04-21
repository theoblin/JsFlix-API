import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {from} from "rxjs";
import {UserEntity} from "../../model/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {AccountService} from "../../../account/service/account.service";
import {AccountEntity} from "../../../account/model/account.entity";
import {PlanService} from "../../../plan/service/plan/plan.service";
import {switchMap} from "rxjs/operators";
import {UserDto} from "../../dto/user.dto";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userEntityRepository: Repository<UserEntity>,
        @InjectRepository(AccountEntity)
        private readonly accountEntityRepository: Repository<AccountEntity>,
        private planService: PlanService,
        private accountService: AccountService
    ) {}

        //Create an user
         createUser(data, id) {
            data.created_at = new Date()
             return from(this.planService.getAccountPlan(id)).pipe(
                 switchMap((plan) => {
                 return this.accountService.findOne(id).then(account => {
                     if(account.user.length >= plan[0].max_user)
                         throw new UnauthorizedException("Max user reached")
                     const user = this.userEntityRepository.create({...data, account : account})
                     return this.userEntityRepository.save(user)
                 })
             }))
        }

        //Get users
        async getAccountUsers(id){
            const userArray = []
             await this.userEntityRepository.createQueryBuilder("user")
                .leftJoinAndSelect("user.account", "account")
                .where("account.id = :id", {id: id.id})
                .getMany().then(users => {
                    users.forEach((user) => userArray.push(this.convertToUserDto(user)))
                })
            return userArray
        }

        //Get one user with account id and user id
        async getUser(accountId,userId){
            return await this.userEntityRepository.createQueryBuilder("user")
                .leftJoinAndSelect("user.account", "account")
                .where("account.id = :id", {id: accountId})
                .where("user.id = :id", {id: userId})
                .getOne().then(user => {
                    if(!user){
                        throw new NotFoundException(this.errorhandle(accountId,"Find user",400))
                    }
                   return this.convertToUserDto(user)
                })
        }

        //Update an user
        async updateUser(accountId,userId,data){
            try{
                const user = await this.getUser(accountId,userId)
                user.icon_url = data.icon_url
                user.is_child = data.is_child
                user.username = data.username
                return this.userEntityRepository.update(userId,this.convertToUserEntity(user))
            }catch(e){
                return e.response
            }
        }

        //Remove an user
        async deleteUser(accountId,userId){
                try{
                    const user = await this.getUser(accountId,userId)
                    return this.userEntityRepository.remove(this.convertToUserEntity(user))
                }catch(e){
                    return e.response
                }
        }

        //Convert to safe data
        convertToUserDto(user: any) {
            return  new UserDto(user.id,user.username,user.created_at, user.icon_url ,user.is_child)
        }

        //Convert to entity
        convertToUserEntity(user: UserDto) {
            return  new UserEntity(user.id,user.created_at,user.username, user.icon_url ,user.is_child)
        }

        //Errors formatter
        errorhandle(id:number,action:string,status:number,data=null){
            return {
                id: id,
                action:action,
                status: status,
                data:data
            }
        }
}


