"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceJobConcreteClasses_1 = require("./ServiceJobConcreteClasses");
var ServiceJobEnum;
(function (ServiceJobEnum) {
    ServiceJobEnum[ServiceJobEnum["HOUSEKEEPING"] = 0] = "HOUSEKEEPING";
    ServiceJobEnum[ServiceJobEnum["ELDERHELP"] = 1] = "ELDERHELP";
    ServiceJobEnum[ServiceJobEnum["NANNY"] = 2] = "NANNY";
    ServiceJobEnum[ServiceJobEnum["ANIMALSHELP"] = 3] = "ANIMALSHELP";
})(ServiceJobEnum = exports.ServiceJobEnum || (exports.ServiceJobEnum = {}));
class ServiceJobFactory {
    static createServiceJob(type) {
        if (type === ServiceJobEnum.HOUSEKEEPING) {
            return new ServiceJobConcreteClasses_1.HouseKeeping("House Keeping", "House Keeping Description");
        }
        else if (type === ServiceJobEnum.ELDERHELP) {
            return new ServiceJobConcreteClasses_1.EldersHelp("Elders Help", "Elders Help Description");
        }
        else if (type === ServiceJobEnum.NANNY) {
            return new ServiceJobConcreteClasses_1.Nanny("Nanny Job", "Nanny Job Description");
        }
        else if (type === ServiceJobEnum.ANIMALSHELP) {
            return new ServiceJobConcreteClasses_1.AnimalsHelp("Animals Help", "Animals Help Description");
        }
    }
}
exports.ServiceJobFactory = ServiceJobFactory;
