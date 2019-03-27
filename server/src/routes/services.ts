import { Router, Request } from "express";
const ServiceJob = require("../helpers/ServiceJob");

const serviceRouter: Router = Router();

serviceRouter.get('', (request: Request, response: any) => {
    ServiceJob.find({}, function (error: any, serviceJobs: any) {
        response.send(serviceJobs);
    });
});


export { serviceRouter }
