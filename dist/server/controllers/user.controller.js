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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc2VydmVyL3NyYy9jb250cm9sbGVycy91c2VyLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxREFBaUY7QUFJakYsS0FBSyxVQUFVLFVBQVUsQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQXVDO0lBQzlFLE9BQU8sb0JBQUksQ0FBQyxNQUFNLENBQUM7UUFDZixLQUFLO1FBQ0wsUUFBUTtLQUNYLENBQUM7U0FDRyxJQUFJLENBQUMsQ0FBQyxJQUFXLEVBQUUsRUFBRTtRQUNsQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDLENBQUM7U0FDRCxLQUFLLENBQUMsQ0FBQyxLQUFZLEVBQUUsRUFBRTtRQUNwQixNQUFNLEtBQUssQ0FBQztJQUNoQixDQUFDLENBQUMsQ0FBQztBQUNYLENBQUM7QUFFRCxLQUFLLFVBQVUsaUJBQWlCLENBQUMsRUFBRSxLQUFLLEVBQXFCO0lBQ3pELE9BQU8sb0JBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQztTQUN6QixJQUFJLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRTtRQUNoQixJQUFJLElBQUk7WUFDSixPQUFPLElBQUksQ0FBQzs7WUFFWixPQUFPLEtBQUssQ0FBQztJQUNyQixDQUFDLENBQUM7U0FDRCxLQUFLLENBQUMsQ0FBQyxLQUFZLEVBQUUsRUFBRTtRQUNwQixPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUE7SUFDeEIsQ0FBQyxDQUFDLENBQUM7QUFDWCxDQUFDO0FBRUQsS0FBSyxVQUFVLFVBQVUsQ0FBQyxRQUFRO0lBQzlCLElBQUksUUFBUSxDQUFDLFVBQVUsRUFBRTtRQUNyQixxQkFBUSxDQUFDLE1BQU0sQ0FBQztZQUNaLElBQUksRUFBRSxVQUFVO1lBQ2hCLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSztZQUNyQixTQUFTLEVBQUUsUUFBUSxDQUFDLFNBQVM7WUFDN0IsUUFBUSxFQUFFLFFBQVEsQ0FBQyxRQUFRO1lBQzNCLFFBQVEsRUFBRSxRQUFRLENBQUMsUUFBUTtZQUMzQixnQkFBZ0IsRUFBRSxRQUFRLENBQUMsZ0JBQWdCO1NBQzlDLENBQUM7YUFDRyxJQUFJLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRTtZQUNoQixJQUFJLElBQUk7Z0JBQ0osT0FBTyxJQUFJLENBQUM7O2dCQUVaLE9BQU8sS0FBSyxDQUFDO1FBQ3JCLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxDQUFDLEtBQVksRUFBRSxFQUFFO1lBQ3BCLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztLQUNWO1NBQU07UUFDSCwrQkFBa0IsQ0FBQyxNQUFNLENBQUM7WUFDdEIsSUFBSSxFQUFFLG9CQUFvQjtZQUMxQixLQUFLLEVBQUUsUUFBUSxDQUFDLEtBQUs7WUFDckIsU0FBUyxFQUFFLFFBQVEsQ0FBQyxTQUFTO1lBQzdCLFFBQVEsRUFBRSxRQUFRLENBQUMsUUFBUTtZQUMzQixRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVE7WUFDM0Isa0JBQWtCLEVBQUUsUUFBUSxDQUFDLGtCQUFrQjtTQUNsRCxDQUFDO2FBQ0csSUFBSSxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUU7WUFDaEIsSUFBSSxJQUFJO2dCQUNKLE9BQU8sSUFBSSxDQUFDOztnQkFFWixPQUFPLEtBQUssQ0FBQztRQUNyQixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsQ0FBQyxLQUFZLEVBQUUsRUFBRTtZQUNwQixPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7S0FDVjtBQUNMLENBQUM7QUFBQSxDQUFDO0FBRUYsS0FBSyxVQUFVLFlBQVk7SUFDdkIsT0FBTyxxQkFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7U0FDbkIsSUFBSSxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUU7UUFDaEIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQyxDQUFDO1NBQ0QsS0FBSyxDQUFDLENBQUMsS0FBWSxFQUFFLEVBQUU7UUFDcEIsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxDQUFDO0FBQ1gsQ0FBQztBQUVELEtBQUssVUFBVSxtQkFBbUI7SUFDOUIsT0FBTywrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1NBQzdCLElBQUksQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFO1FBQ2hCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUMsQ0FBQztTQUNELEtBQUssQ0FBQyxDQUFDLEtBQVksRUFBRSxFQUFFO1FBQ3BCLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQztBQUNYLENBQUM7QUFHRCxrQkFBZTtJQUNYLFVBQVU7SUFDVixpQkFBaUI7SUFDakIsVUFBVTtJQUNWLFlBQVk7SUFDWixtQkFBbUI7Q0FDdEIsQ0FBQyJ9