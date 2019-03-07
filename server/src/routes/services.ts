import { Router } from "express";

const router: Router = Router();
const ServiceJobModel = require("../models/ServiceJob");

router.get('/services', (request: Request, response: any) => {
    ServiceJobModel.find({}, function (error: any, serviceJobs: any) {
        response.send(serviceJobs);
    });
});