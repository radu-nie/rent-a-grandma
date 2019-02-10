// Import only what we need from express
import { Router, Request, Response } from 'express';
import { Interface } from 'readline';
import { NextFunction } from 'connect';
import * as userService from './user.service';
// Assign router to the express.Router() instance
const userRouter: Router = Router();
const userServiceInstance = new userService.UserService();
const jwt = require('jsonwebtoken');
const config = require('config');

userRouter.post('/authenticate', (req: Request, res: any) => {
    var callBack = function (err: Error, user: any) {
        if (err) {
            res.json(400, err);
            throw err;
        }

        if (user) {
            jwt.sign({
                user
            }, config.get('secret'), (err: Error, token: string) => {
                res.json({
                    id: user._id,
                    usernafme: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    token: token,
                })
            });

            return;
        }
        return res.json(400, {
            message: 'Username or password is incorrect'
        });
    }
    userServiceInstance.authenticate(req.body, callBack);

});

userRouter.post('/register', (req: Request, res: any) => {
    var callBack = function (err: Error, response: any) {
        if (err) {
            res.json(400, err);
            throw err;
        }
        console.log(response);

        if (response) {
            res.json();
            return;
        }
        return res.json(400, {
            message: 'Username or password is incorrect'
        });
    }
    userServiceInstance.register(req.body, callBack);

});

userRouter.get('', (req: Request, res: any, next) => {
    /** Do logic cor authentication JWT as handler for GET Router */
    var callBack = function (err: Error, response: any) {
        if (err) {
            res.json(400, err);
            throw err;
        }
        console.log(response);

        if (response.length) {
            var userArr: any[] = [];

            response.forEach((user: any) => {
                userArr.push({
                    id: user._id,
                    userName: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    token: 'fake-jwt-token'
                })
            });
            res.json(userArr);
            return;
        }
        return res.json(400, {
            message: 'No existing users'
        });
    }
    userServiceInstance.getUsers(callBack);
});

userRouter.get('/:id', validateJWT, (req: any, res: any) => {

    var callBack = function (err: Error, user: any) {
        if (err) {
            res.json(400, err);
            throw err;
        }

        if (user) {
            res.json(user);
            return;
        }

        return res.json(400, {
            message: 'User does not exist'
        });
    }

    jwt.verify(req.token, config.get('secret'), (err: Error, authData: any) => {
        // If token not ok lock route
        if (err) {
            res.sendStatus(403);
        } else {
            userServiceInstance.getUserById(req.params.id, callBack);
        }
    });

});

userRouter.delete('/:id', validateJWT, (req: Request, res: any) => {
    var callBack = function (err: Error, response: Response) {
        if (err) {
            res.json(400, err);
            throw err;
        }
        console.log(response);
        res.json('User deleted');
    }
    userServiceInstance.deleteUserByID(req.params.id, callBack);
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