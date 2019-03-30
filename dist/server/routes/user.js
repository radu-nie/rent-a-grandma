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
