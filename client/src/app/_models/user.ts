export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    salt: string;
    active: boolean;
    date_added: Date;
    last_modified: Date;
    last_password: string;
}

