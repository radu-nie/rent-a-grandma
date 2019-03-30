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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zZXJ2ZXIvc3JjL3JvdXRlcy9zZXJ2aWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFDQUEwQztBQUMxQyxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQztBQUVwRCxNQUFNLGFBQWEsR0FBVyxnQkFBTSxFQUFFLENBQUM7QUFTOUIsc0NBQWE7QUFQdEIsYUFBYSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxPQUFnQixFQUFFLFFBQWEsRUFBRSxFQUFFO0lBQ3RELFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFVBQVUsS0FBVSxFQUFFLFdBQWdCO1FBQ3RELFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9