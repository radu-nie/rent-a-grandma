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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmljZUpvYkZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zZXJ2ZXIvc3JjL2hlbHBlcnMvU2VydmljZUpvYkZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyRUFBMkY7QUFHM0YsSUFBWSxjQUtYO0FBTEQsV0FBWSxjQUFjO0lBQ3RCLG1FQUFZLENBQUE7SUFDWiw2REFBUyxDQUFBO0lBQ1QscURBQUssQ0FBQTtJQUNMLGlFQUFXLENBQUE7QUFDZixDQUFDLEVBTFcsY0FBYyxHQUFkLHNCQUFjLEtBQWQsc0JBQWMsUUFLekI7QUFFRCxNQUFhLGlCQUFpQjtJQUNuQixNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBb0I7UUFDL0MsSUFBSSxJQUFJLEtBQUssY0FBYyxDQUFDLFlBQVksRUFBRTtZQUN0QyxPQUFPLElBQUksd0NBQVksQ0FBQyxlQUFlLEVBQUUsMkJBQTJCLENBQUMsQ0FBQztTQUN6RTthQUFNLElBQUksSUFBSSxLQUFLLGNBQWMsQ0FBQyxTQUFTLEVBQUU7WUFDMUMsT0FBTyxJQUFJLHNDQUFVLENBQUMsYUFBYSxFQUFFLHlCQUF5QixDQUFDLENBQUM7U0FDbkU7YUFBTSxJQUFJLElBQUksS0FBSyxjQUFjLENBQUMsS0FBSyxFQUFFO1lBQ3RDLE9BQU8sSUFBSSxpQ0FBSyxDQUFDLFdBQVcsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO1NBQzFEO2FBQU0sSUFBSSxJQUFJLEtBQUssY0FBYyxDQUFDLFdBQVcsRUFBRTtZQUM1QyxPQUFPLElBQUksdUNBQVcsQ0FBQyxjQUFjLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztTQUN0RTtJQUNMLENBQUM7Q0FDSjtBQVpELDhDQVlDIn0=