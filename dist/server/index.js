"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
//import dotenv from "dotenv";
const bodyParser = require("body-parser");
const compression = require("compression");
const user_1 = require("./routes/user");
const services_1 = require("./routes/services");
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
app.use('/api/users', user_1.userRouter);
app.use('/api/services', services_1.serviceRouter);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zZXJ2ZXIvc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ25DLDhCQUE4QjtBQUM5QixNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDMUMsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBRTNDLHdDQUEyQztBQUMzQyxnREFBa0Q7QUFFbEQsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3JDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUVqQyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUN2QyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7QUFFbEIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7QUFFN0MsTUFBTSxHQUFHLEdBQUcsT0FBTyxFQUFFLENBQUM7QUFDdEIsT0FBTyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFFbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBRW5DLEdBQUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDNUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO0lBQ3BCLEtBQUssRUFBRSxNQUFNO0NBQ2hCLENBQUMsQ0FBQyxDQUFDO0FBRUosR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDO0lBQzFCLFFBQVEsRUFBRSxJQUFJO0lBQ2QsS0FBSyxFQUFFLE1BQU07SUFDYixjQUFjLEVBQUUsS0FBSztDQUN4QixDQUFDLENBQUMsQ0FBQztBQUNKLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7SUFDNUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyw2QkFBNkIsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMvQyxHQUFHLENBQUMsTUFBTSxDQUFDLDhCQUE4QixFQUFFLGdEQUFnRCxDQUFDLENBQUM7SUFDN0YsSUFBSSxFQUFFLENBQUM7QUFDWCxDQUFDLENBQUMsQ0FBQztBQUVILEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztBQUN2QixHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbkIsY0FBYyxFQUFFLElBQUk7Q0FDdkIsQ0FBQyxDQUFDLENBQUM7QUFFSixHQUFHLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxpQkFBVSxDQUFDLENBQUM7QUFDbEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsd0JBQWEsQ0FBQyxDQUFDO0FBR3hDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtJQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixJQUFJLEdBQUcsQ0FBQyxDQUFDO0FBQzlDLENBQUMsQ0FBQyxDQUFDO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBNkJLIn0=