"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
async function CreateUser({ email, password }) {
    return user_model_1.default.create({
        email,
        password
    })
        .then((data) => {
        return data;
    })
        .catch((error) => {
        throw error;
    });
}
async function SearchUserByEmail({ email }) {
    return user_model_1.default.findOne({ email })
        .then((data) => {
        if (data)
            return true;
        else
            return false;
    })
        .catch((error) => {
        return error.message;
    });
}
async function createUser(userData) {
    if (userData.isCustomer) {
        user_model_1.Customer.create({
            type: "Customer",
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            password: userData.password,
            customerProperty: userData.customerProperty
        })
            .then((data) => {
            if (data)
                return true;
            else
                return false;
        })
            .catch((error) => {
            return error.message;
        });
    }
    else {
        user_model_1.ServiceJobProvider.create({
            type: "ServiceJobProvider",
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            password: userData.password,
            serviceJobProperty: userData.serviceJobProperty
        })
            .then((data) => {
            if (data)
                return true;
            else
                return false;
        })
            .catch((error) => {
            return error.message;
        });
    }
}
;
async function getCustomers() {
    return user_model_1.Customer.find({})
        .then((data) => {
        return data;
    })
        .catch((error) => {
        return error.message;
    });
}
async function getServiceProviders() {
    return user_model_1.ServiceJobProvider.find({})
        .then((data) => {
        return data;
    })
        .catch((error) => {
        return error.message;
    });
}
exports.default = {
    CreateUser,
    SearchUserByEmail,
    createUser,
    getCustomers,
    getServiceProviders
};
//# sourceMappingURL=user.controller.js.map