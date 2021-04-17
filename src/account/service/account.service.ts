import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {AccountEntity} from "../model/account.entity";
import {createQueryBuilder, Repository} from "typeorm";
import {AuthService} from "../../auth/service/auth.service";
import {map, switchMap} from "rxjs/operators";
import {from, Observable} from "rxjs";
import {AccountDto} from "../dto/account.dto";
import {PlanEntity} from "../../plan/model/plan.entity";
import {VideoEntity} from "../../video/model/video.entity";
import {VideoDto} from "../../video/dto/video.dto";

@Injectable()
export class AccountService {

    constructor(
        @InjectRepository(AccountEntity)
        private readonly accountEntityRepository: Repository<AccountEntity>,
        @InjectRepository(PlanEntity)
        private planEntityRepository: Repository<PlanEntity>,
        @InjectRepository(VideoEntity)
        private videoEntityRepository: Repository<VideoEntity>,

        private authService: AuthService,
    ) {}

    //Create an account
    createAccount(data): Observable<AccountDto> {
        return this.authService.hashPassword(data.password).pipe(
            switchMap((passwordHash: string) => {
                const newAccount = new AccountEntity(
                    data.id,
                    new Date(),
                    data.next_bill_date,
                    data.username,
                    passwordHash,
                    data.first_name,
                    data.last_name,
                    data.country,
                    data.email
                );
                return from(this.accountEntityRepository.save(newAccount)).pipe(
                    map((account: AccountEntity) => {
                        const {password, ...result} = account
                        return this.convertToDto(result);
                    }),
                )
            })
        )
    }

    //Find an account by ID
    findOne(id: number): Promise<any> {
        return this.accountEntityRepository.findOne(id,{relations:['plan']}).then(account => {
                if(!account)
                    throw new NotFoundException(this.errorhandle(id,"find account",404))
                return this.convertToDto(account)
            }
        )
    }

    //Sign in account and return JWT token
    login(account:AccountEntity){
       return  from(this.validateAccount(account.email, account.password)).pipe(
           switchMap((account: AccountEntity) => {
            if(account){
                return this.authService.generateJWT(account).pipe(map(( jwt: string) => jwt))
            }
           })
       )
    }

    //Link account with is plan ID
    async addPlanToAccount(id, planId){
       return from(this.accountEntityRepository.findOne(parseInt(id.id), {relations: ['plan']})).pipe(
            switchMap((account: AccountEntity) => {
               if(!account) {
                   throw new NotFoundException(this.errorhandle(parseInt(id.id),"Find account", 404))
               }else{
                  return from(this.planEntityRepository.findOne(parseInt(planId.planId))).pipe(
                       map((plan: PlanEntity) => {
                           if(!plan)
                               throw new NotFoundException(this.errorhandle(parseInt(planId.planId),"Find plan", 404, this.convertToDto(account)))
                            account.plan = plan
                            return this.accountEntityRepository
                            .update( parseInt(id.id), account)
                            .then(() => (this.errorhandle(parseInt(id.id),"update account plan", 200, this.convertToDto(account))))
                       })
                   )
               }
            })
        )
    }

    //check if acount exist with email then password
    validateAccount(email: string, password: string){
        return from(this.findByEmail(email).pipe(
            switchMap((account: AccountEntity) => {
               if(!account){
                   throw new NotFoundException(null, "Unknow email");
               }
                return this.authService.comparePassword(password, account.password).pipe(
                    map((match: boolean) => {
                        if (match) {
                            const {password, ...result} = account
                            return result
                        }else{
                            throw new NotFoundException(null, "Bad credentials");
                        }
                    })
                )
            })
        ))
    }

    //Find account by email
    findByEmail(email: string){
        return from(this.accountEntityRepository.findOne({email}))
    }

    //Convert to return safe payload
    convertToDto(account: any) {
        return  new AccountDto(account.username, account.email, account.id)
    }

    //Error formatter
    errorhandle(id:number,action:string,status:number,data=null){
        return {
            id: id,
            action:action,
            status: status,
            data:data
        }
    }
}



