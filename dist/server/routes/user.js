"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//#region MODELS REFERENCES
const customer_model_1 = require("../models/customer.model");
//#endregion
//#region CONTROLLERS REFERENCES
const user_controller_1 = require("../controllers/user.controller");
//#endregion
const userRouter = express_1.Router();
exports.userRouter = userRouter;
userRouter.post('/authenticate', (req, res) => {
    customer_model_1.default.findOne({ userName: req.body.username }).exec()
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
            customer_model_1.default.find().exec()
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
userRouter.get('/:id', validateJWT, (req, res) => {
    jwt.verify(req.token, config.get('secret'), (err, authData) => {
        // If token not ok lock route
        if (err) {
            res.sendStatus(403);
        }
        else {
            customer_model_1.default.findOne({ id: req.params.id }).exec()
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
            customer_model_1.default.deleteOne({ _id: new mongoose.Types.ObjectId(req.params.id) })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvcm91dGVzL3VzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBb0Q7QUFFcEQscUNBQXFDO0FBQ3JDLGlDQUFpQztBQUNqQyxvQ0FBb0M7QUFDcEMsaUNBQWlDO0FBRWpDLDJCQUEyQjtBQUMzQiw2REFBdUQ7QUFDdkQsWUFBWTtBQUVaLGdDQUFnQztBQUNoQyxvRUFBNEQ7QUFDNUQsWUFBWTtBQUVaLE1BQU0sVUFBVSxHQUFXLGdCQUFNLEVBQUUsQ0FBQztBQTJLM0IsZ0NBQVU7QUF6S25CLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsR0FBWSxFQUFFLEdBQVEsRUFBRSxFQUFFO0lBRXhELHdCQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsUUFBUSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUU7U0FDL0MsSUFBSSxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUU7UUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN6QyxJQUFJLElBQUksRUFBRTtZQUNOLHlDQUF5QztZQUN6QyxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUN0RCw0QkFBNEI7Z0JBQzVCLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7b0JBQ2pCLEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBRztvQkFDWixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7b0JBQ3ZCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtvQkFDdkIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO2lCQUMxQixFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVB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