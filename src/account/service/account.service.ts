import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {AccountEntity} from "../model/account.entity";
import {Repository} from "typeorm";
import {AuthService} from "../../auth/service/auth.service";
import {catchError, map, switchMap} from "rxjs/operators";
import {from, Observable, throwError} from "rxjs";
import {AccountDto} from "../dto/account.dto";

@Injectable()
export class AccountService {

    constructor(
        @InjectRepository(AccountEntity)
        private readonly accountEntityRepository: Repository<AccountEntity>,
        private authService: AuthService
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
                    data.email,
                );
                return from(this.accountEntityRepository.save(newAccount)).pipe(
                    map((account: AccountEntity) => {
                        const {password, ...result} = account
                        return this.convertToDto(result);
                    }),
                    catchError(err => throwError(err))
                )
            }))
    }

    //Find an account by ID
    findOne(id: number): Promise<any> {
        return this.accountEntityRepository.findOneOrFail(id).then(account => {
                return this.convertToDto(account)
            }
        ).catch((e) => e)
    }

    login(account:AccountEntity){
       return  from(this.valdateAccount(account.email, account.password)).pipe(
           switchMap((account: AccountEntity) => {
            if(account){
                return this.authService.generateJWT(account).pipe(map(( jwt: string) => jwt))
            }
           })
       )
    }

    //check if acount exist with email then password
    valdateAccount(email: string, password: string){
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

    findByEmail(email: string){
        return from(this.accountEntityRepository.findOne({email}))
    }

    convertToDto(account: any) {
        const convertedAccount = new AccountDto(account.username, account.email, 1)
        return convertedAccount
    }
}
