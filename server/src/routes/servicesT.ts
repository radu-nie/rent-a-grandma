// Import only what we need from express
import { Router, Request, Response } from 'express';
import { Interface } from 'readline';
import { NextFunction } from 'connect';

const serviceRouter: Router = Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const User = require('../models/User');

const bcrypt = require('bcrypt');
const randtoken = require('rand-token')


serviceRouter.post('/authenticate', (req: Request, res: any) => {

    console.log('pula mea');

});


export { serviceRouter }