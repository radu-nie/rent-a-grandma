import User, { IUser } from '../models/customer.model';

async function CreateUser({ email, password }: { email: string; password: string }): Promise<IUser> {
    return User.create({
        email,
        password
    })
        .then((data: IUser) => {
            return data;
        })
        .catch((error: Error) => {
            throw error;
        });
}

async function SearchUserByEmail({ email }: { email: string }): Promise<any> {
    return User.findOne({ email })
        .then((data: any) => {
            if (data)
                return true;
            else
                return false;
        })
        .catch((error: Error) => {
            return error.message
        });
}

export default {
    CreateUser,
    SearchUserByEmail
};