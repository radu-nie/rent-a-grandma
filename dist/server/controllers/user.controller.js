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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc2VydmVyL3NyYy9jb250cm9sbGVycy91c2VyLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2REFBdUQ7QUFFdkQsS0FBSyxVQUFVLFVBQVUsQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQXVDO0lBQzlFLE9BQU8sd0JBQUksQ0FBQyxNQUFNLENBQUM7UUFDZixLQUFLO1FBQ0wsUUFBUTtLQUNYLENBQUM7U0FDRyxJQUFJLENBQUMsQ0FBQyxJQUFXLEVBQUUsRUFBRTtRQUNsQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDLENBQUM7U0FDRCxLQUFLLENBQUMsQ0FBQyxLQUFZLEVBQUUsRUFBRTtRQUNwQixNQUFNLEtBQUssQ0FBQztJQUNoQixDQUFDLENBQUMsQ0FBQztBQUNYLENBQUM7QUFFRCxLQUFLLFVBQVUsaUJBQWlCLENBQUMsRUFBRSxLQUFLLEVBQXFCO0lBQ3pELE9BQU8sd0JBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQztTQUN6QixJQUFJLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRTtRQUNoQixJQUFJLElBQUk7WUFDSixPQUFPLElBQUksQ0FBQzs7WUFFWixPQUFPLEtBQUssQ0FBQztJQUNyQixDQUFDLENBQUM7U0FDRCxLQUFLLENBQUMsQ0FBQyxLQUFZLEVBQUUsRUFBRTtRQUNwQixPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUE7SUFDeEIsQ0FBQyxDQUFDLENBQUM7QUFDWCxDQUFDO0FBRUQsa0JBQWU7SUFDWCxVQUFVO0lBQ1YsaUJBQWlCO0NBQ3BCLENBQUMifQ==