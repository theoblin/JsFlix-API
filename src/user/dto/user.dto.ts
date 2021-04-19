export class UserDto {
    constructor(id:number, username: string, created_at: Date, icon_url: string, is_child: boolean ) {
        this.id = id
        this.username = username
        this.created_at = created_at
        this.icon_url = icon_url
        this.is_child = is_child
    }

    id: number;
    username: string;
    created_at: Date;
    icon_url: string;
    is_child: boolean;
}
