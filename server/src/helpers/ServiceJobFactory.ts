import { HouseKeeping, EldersHelp, Nanny, AnimalsHelp } from './ServiceJobConcreteClasses';
import { ServiceJob } from './ServiceJob';

export enum ServiceJobEnum {
    HOUSEKEEPING,
    ELDERHELP,
    NANNY,
    ANIMALSHELP
}

export class ServiceJobFactory {
    public static createServiceJob(type: ServiceJobEnum): any {
        if (type === ServiceJobEnum.HOUSEKEEPING) {
            return new HouseKeeping("House Keeping", "House Keeping Description");
        } else if (type === ServiceJobEnum.ELDERHELP) {
            return new EldersHelp("Elders Help", "Elders Help Description");
        } else if (type === ServiceJobEnum.NANNY) {
            return new Nanny("Nanny Job", "Nanny Job Description");
        } else if (type === ServiceJobEnum.ANIMALSHELP) {
            return new AnimalsHelp("Animals Help", "Animals Help Description");
        }
    }
}