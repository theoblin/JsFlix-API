export class AccountDto {
    constructor(username: string, email: string, id: number) {
        this.username = username
        this.email = email
        this.id = id
    }

    id: number;
    username: string;
    email: string;
}
