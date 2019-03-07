<<<<<<< HEAD
import { Router } from "express";
import { ServiceJobModel } from "../models/ServiceJob";
const serviceRouter: Router = Router();
//const ServiceJobModel = require("../models/ServiceJob");

serviceRouter.get('', (request: Request, response: any) => {
=======
import { Router, Request, Response } from "express";

const servicesRouter: Router = Router();
const ServiceJobModel = require("../models/ServiceJob");

servicesRouter.get('', (request: Request, response: Response) => {
>>>>>>> 281739f3287c52ea88f2f9b2f47a6f28b431b68a
    ServiceJobModel.find({}, function (error: any, serviceJobs: any) {
        response.send(serviceJobs);
    });
});

<<<<<<< HEAD

export { serviceRouter }
=======
export { servicesRouter }
>>>>>>> 281739f3287c52ea88f2f9b2f47a6f28b431b68a
