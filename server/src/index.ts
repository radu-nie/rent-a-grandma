const express = require("express");
//import dotenv from "dotenv";
const bodyParser = require("body-parser");
const compression = require("compression");

import { userRouter } from './routes/user';
import { serviceRouter } from "./routes/services";
import { fileRouter } from "./routes/file";

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

app.use('/api/users', userRouter);
app.use('/api/services', serviceRouter);
app.use('/api/files', fileRouter);


app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});