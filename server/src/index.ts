import express from "express";
//import dotenv from "dotenv";
import bodyParser from "body-parser";
import path from "path";
import compression from "compression";
import moment from "moment";

import * as userRoutes from './routes/user';
import { serviceRouter } from "./routes/services";

const mongoose = require('mongoose');
const config = require('config');

var device = require('express-device');
const port = 4300;

mongoose.connect(config.get('dbConfig.url'));

const app = express();
exports.app = app;

console.log('Application Started');

app.disable('x-powered-by');
app.use(bodyParser.json({
    limit: '50mb'
}));

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 50000
}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(compression());
app.use(device.capture({
    parseUserAgent: true
}));

app.use('/api/users', userRoutes.userRouter);
app.use('/api/services', serviceRouter);


app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});
/*
async function createCustomer(customerData: any) {
    const customer = new Customer(customerData);
    const result = await customer.save();
    console.log("Created customer : " + result);
}

createCustomer({
    userName: "customer1UserName",
    password: "C1UN",
    firstName: "C1_F_N",
    lastName: "C1_L_N",
    active: true,
    token: "C1_Token"
});

async function createServiceJobProvider(serviceJobProviderData: any) {
    const serviceJobProvider = new ServiceJobProvider(serviceJobProviderData);
    const result = await serviceJobProvider.save();
    console.log("Created service job provider : " + result);
}

createServiceJobProvider({
    userName: "provider1UserName",
    password: "P1UN",
    firstName: "P1_F_N",
    lastName: "P1_L_N",
    active: true,
    token: "P1_Token"
});*/