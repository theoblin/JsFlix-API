import {UserEntity} from "../../user/model/user.entity";

export class AccountDto {
    constructor(username: string, email: string, id: number, user: UserEntity[]) {
        this.username = username
        this.email = email
        this.id = id
        this.user = user
    }

    id: number;
    username: string;
    email: string;
    user: UserEntity[]
}
