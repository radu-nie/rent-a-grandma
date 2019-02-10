// Import only what we need from express
import { Router, Request, Response } from 'express';
import { Interface } from 'readline';
import { NextFunction } from 'connect';

const userRouter: Router = Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const User = require('../models/User');

const bcrypt = require('bcrypt');
const randtoken = require('rand-token')


userRouter.post('/authenticate', (req: Request, res: any) => {

    User.findOne({ userName: req.body.username }).exec()
        .then((user: any) => {
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
                    res.json({
                        id: user._id,
                        username: user.userName,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        token: token
                    })
                } else {
                    /** Password incorrect */
                    res.json(400, {
                        message: 'Username or password is incorrect'
                    });
                }
            } else {
                res.json(400, {
                    message: 'Username or password is incorrect'
                });
            }
        })
        .catch((err: any) => {
            console.log('Error authenticating', err);
            res.json(400, {
                message: 'Username or password is incorrect'
            });
        });

});

userRouter.post('/register', (req: Request, res: any) => {
    const user = new User({
        _id: mongoose.Types.ObjectId(),
        userName: req.body.username,
        password: bcrypt.hashSync(req.body.password, 7),
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });

    /** Do user save action */
    user.
        save()
        .then((result: any) => {
            console.log('Registration success', result);
            res.json();
        })
        .catch((err: Error) => {
            console.log('Registration Error', err);
            res.json(400, {
                message: 'Username or password is incorrect'
            });
        });
});

userRouter.get('', validateJWT, (req: any, res: any, next) => {
    jwt.verify(req.token, config.get('secret'), (err: Error, authData: any) => {
        // If token not ok lock route
        if (err) {
            res.sendStatus(403);
        } else {
            User.find().exec()
                .then((users: any) => {
                    console.log('List of users', users);
                    let userArr: Array<any> = [];
                    users.forEach((user: any) => {
                        userArr.push({
                            id: user._id,
                            username: user.userName,
                            firstName: user.firstName,
                            lastName: user.lastName
                        })
                    });
                    res.json(userArr);
                })
                .catch((err: any) => {
                    console.log("Error retrieving list of users", err);
                    res.json(400, {
                        message: 'No existing users'
                    });
                });
        }
    });
});

userRouter.get('/:id', validateJWT, (req: any, res: any) => {


    jwt.verify(req.token, config.get('secret'), (err: Error, authData: any) => {
        // If token not ok lock route
        if (err) {
            res.sendStatus(403);
        } else {
            User.findOne({ id: req.params.id }).exec()
                .then((user: any) => {
                    res.json(user);
                })
                .catch((err: any) => {
                    console.log("Error retrieving requested user", err);
                    res.json(400, {
                        message: 'User does not exist'
                    });
                });

        }
    });

});

userRouter.delete('/:id', validateJWT, (req: any, res: any) => {

    jwt.verify(req.token, config.get('secret'), (err: Error, authData: any) => {
        // If token not ok lock route
        if (err) {
            res.sendStatus(403);
        } else {
            User.deleteOne({ _id: new mongoose.Types.ObjectId(req.params.id) })
                .exec()
                .then((response: any) => {
                    console.log('User deleted', response);
                    res.json('User deleted');
                })
                .catch((err: any) => {
                    console.log('Error deleting', err);
                    res.json(400, err);
                });
        }
    });
});


function validateJWT(req: any, res: Response, next: NextFunction) {
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
    } else {
        res.sendStatus(403);
    }
}


//exports.userRouter = userRouter;

export { userRouter }