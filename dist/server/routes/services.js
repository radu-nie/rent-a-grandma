"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ServiceJob = require("../helpers/ServiceJob");
const serviceRouter = express_1.Router();
exports.serviceRouter = serviceRouter;
serviceRouter.get('', (request, response) => {
    ServiceJob.find({}, function (error, serviceJobs) {
        response.send(serviceJobs);
    });
});
