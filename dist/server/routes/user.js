"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//#region MODELS REFERENCES
const user_model_1 = require("../models/user.model");
//#endregion
//#region CONTROLLERS REFERENCES
const user_controller_1 = require("../controllers/user.controller");
//#endregion
const userRouter = express_1.Router();
exports.userRouter = userRouter;
userRouter.post('/authenticate', (req, res) => {
    user_model_1.default.findOne({ userName: req.body.username }).exec()
        .then((user) => {
        console.log('Authentication User', user);
        if (user) {
            /** Check if password is same as in db */
            if (bcrypt.compareSync(req.body.password, user.password)) {
                /** Sign token and return */
                var token = jwt.sign({
                    id: user._id,
                    username: user.userName,
                    fistName: user.fistName,
                    lastName: user.lastName,
                }, config.get('secret'), { expiresIn: '10m' });
                res.jsonp({
                    id: user._id,
                    username: user.userName,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    token: token
                });
            }
            else {
                /** Password incorrect */
                res.jsonp(400, {
                    message: 'Username or password is incorrect'
                });
            }
        }
        else {
            res.jsonp(400, {
                message: 'Username or password is incorrect'
            });
        }
    })
        .catch((err) => {
        console.log('Error authenticating', err);
        res.jsonp(400, {
            message: 'Username or password is incorrect'
        });
    });
});
userRouter.post('/register', async (req, res) => {
    const userFound = await user_controller_1.default.SearchUserByEmail({ email: req.body.email });
    if (userFound) {
        return res.json(409, 'This email is allready used.');
    }
    const user = await user_controller_1.default.CreateUser({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 7)
    });
    return res.jsonp(user);
    /** Reminder: if relationship wanted: use user._id for refference */
});
userRouter.get('', validateJWT, (req, res, next) => {
    jwt.verify(req.token, config.get('secret'), (err, authData) => {
        // If token not ok lock route
        if (err) {
            res.sendStatus(403);
        }
        else {
            user_model_1.default.find().exec()
                .then((users) => {
                console.log('List of users', users);
                let userArr = [];
                users.forEach((user) => {
                    userArr.push({
                        id: user._id,
                        username: user.userName,
                        firstName: user.firstName,
                        lastName: user.lastName
                    });
                });
                res.jsonp(userArr);
            })
                .catch((err) => {
                console.log("Error retrieving list of users", err);
                res.jsonp(400, {
                    message: 'No existing users'
                });
            });
        }
    });
});
userRouter.get("/customers", validateJWT, async (request, response) => {
    const customers = await user_controller_1.default.getCustomers();
    return response.json(customers);
});
userRouter.get("/providers", validateJWT, async (request, response) => {
    const providers = await user_controller_1.default.getServiceProviders();
    return response.json(providers);
});
userRouter.get('/:id', validateJWT, (req, res) => {
    jwt.verify(req.token, config.get('secret'), (err, authData) => {
        // If token not ok lock route
        if (err) {
            res.sendStatus(403);
        }
        else {
            user_model_1.default.findOne({ id: req.params.id }).exec()
                .then((user) => {
                res.jsonp(user);
            })
                .catch((err) => {
                console.log("Error retrieving requested user", err);
                res.jsonp(400, {
                    message: 'User does not exist'
                });
            });
        }
    });
});
userRouter.delete('/:id', validateJWT, (req, res) => {
    jwt.verify(req.token, config.get('secret'), (err, authData) => {
        // If token not ok lock route
        if (err) {
            res.sendStatus(403);
        }
        else {
            user_model_1.default.deleteOne({ _id: new mongoose.Types.ObjectId(req.params.id) })
                .exec()
                .then((response) => {
                console.log('User deleted', response);
                res.jsonp('User deleted');
            })
                .catch((err) => {
                console.log('Error deleting', err);
                res.jsonp(400, err);
            });
        }
    });
});
userRouter.get("/search/:customer", validateJWT, (request, response) => {
    // if (request.params.customer == "Pula") {
    //     Customer.findOne({}).exec()
    //         .then((user: any) => {
    //             response.jsonp(user[0]._);
    //         })
    //         .catch((err: any) => {
    //             console.log("Error retrieving requested user", err);
    //             response.jsonp(400, {
    //                 message: 'User does not exist'
    //             });
    //         });
    // }
});
userRouter.post("/create", validateJWT, async (request, response) => {
    const user = await user_controller_1.default.createUser(request.body);
    return response.json(user);
});
function validateJWT(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader != 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    }
    else {
        res.sendStatus(403);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvcm91dGVzL3VzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBb0Q7QUFFcEQscUNBQXFDO0FBQ3JDLGlDQUFpQztBQUNqQyxvQ0FBb0M7QUFDcEMsaUNBQWlDO0FBRWpDLDJCQUEyQjtBQUMzQixxREFBbUQ7QUFDbkQsWUFBWTtBQUVaLGdDQUFnQztBQUNoQyxvRUFBNEQ7QUFJNUQsWUFBWTtBQUVaLE1BQU0sVUFBVSxHQUFXLGdCQUFNLEVBQUUsQ0FBQztBQTBMM0IsZ0NBQVU7QUF4TG5CLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsR0FBWSxFQUFFLEdBQVEsRUFBRSxFQUFFO0lBRXhELG9CQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsUUFBUSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUU7U0FDL0MsSUFBSSxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUU7UUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN6QyxJQUFJLElBQUksRUFBRTtZQUNOLHlDQUF5QztZQUN6QyxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUN0RCw0QkFBNEI7Z0JBQzVCLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7b0JBQ2pCLEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBRztvQkFDWixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7b0JBQ3ZCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtvQkFDdkIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO2lCQUMxQixFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVB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