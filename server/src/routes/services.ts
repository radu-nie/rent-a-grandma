import { Router } from "express";
import { ServiceJobModel } from "../models/ServiceJob";
const serviceRouter: Router = Router();
//const ServiceJobModel = require("../models/ServiceJob");

serviceRouter.get('', (request: Request, response: any) => {
    ServiceJobModel.find({}, function (error: any, serviceJobs: any) {
        response.send(serviceJobs);
    });
});


export { serviceRouter }