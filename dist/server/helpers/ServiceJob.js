"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServiceJob {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }
    getName() {
        return this.name;
    }
    getDescription() {
        return this.description;
    }
}
exports.ServiceJob = ServiceJob;
