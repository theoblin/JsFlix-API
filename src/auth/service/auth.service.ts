import { Injectable } from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {from, Observable} from "rxjs";
import {AccountEntity} from "../../account/model/account.entity";
const bcrypt = require('bcrypt')

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService) {}

    generateJWT(account: AccountEntity): Observable<string>{
        return from (this.jwtService.signAsync(account))
    }

    hashPassword(password: string): Observable<string>{
        return from<string>(bcrypt.hash(password, 12))
    }

    comparePassword(newPassword: string, passwordHash: string): Observable<any | boolean>{
        return from(bcrypt.compare(newPassword, passwordHash));
    }

}
