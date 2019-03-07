import { Router, Request, Response } from "express";

const servicesRouter: Router = Router();
const ServiceJobModel = require("../models/ServiceJob");

servicesRouter.get('', (request: Request, response: Response) => {
    ServiceJobModel.find({}, function (error: any, serviceJobs: any) {
        response.send(serviceJobs);
    });
});

export { servicesRouter }