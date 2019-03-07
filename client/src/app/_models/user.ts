export class User {
    id: number;
    email: string;
    password: string;
    name: string;
    salt: string;
    active: boolean;
    date_added: Date;
    last_modified: Date;
    last_password: string;
}

