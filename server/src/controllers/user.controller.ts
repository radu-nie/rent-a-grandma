import User, { IUser, Customer, ServiceJobProvider } from '../models/user.model';



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

async function createUser(userData): Promise<any> {
    if (userData.isCustomer) {
        Customer.create({
            type: "Customer",
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            password: userData.password,
            customerProperty: userData.customerProperty
        })
            .then((data: any) => {
                if (data)
                    return true;
                else
                    return false;
            })
            .catch((error: Error) => {
                return error.message;
            });
    } else {
        ServiceJobProvider.create({
            type: "ServiceJobProvider",
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            password: userData.password,
            serviceJobProperty: userData.serviceJobProperty
        })
            .then((data: any) => {
                if (data)
                    return true;
                else
                    return false;
            })
            .catch((error: Error) => {
                return error.message;
            });
    }
};

async function getCustomers(): Promise<any> {
    return Customer.find({})
        .then((data: any) => {
            return data;
        })
        .catch((error: Error) => {
            return error.message;
        });
}

async function getServiceProviders(): Promise<any> {
    return ServiceJobProvider.find({})
        .then((data: any) => {
            return data;
        })
        .catch((error: Error) => {
            return error.message;
        });
}


export default {
    CreateUser,
    SearchUserByEmail,
    createUser,
    getCustomers,
    getServiceProviders
};