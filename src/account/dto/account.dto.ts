export class AccountDto {
    constructor(username: string, email: string, planId: number ) {
        this.username = username
        this.email = email
        this.planId = planId
    }

    id: number;
    username: string;
    email: string;
    planId: number;
}
