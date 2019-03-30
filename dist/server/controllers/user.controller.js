"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customer_model_1 = require("../models/customer.model");
async function CreateUser({ email, password }) {
    return customer_model_1.default.create({
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
    return customer_model_1.default.findOne({ email })
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
exports.default = {
    CreateUser,
    SearchUserByEmail
};
