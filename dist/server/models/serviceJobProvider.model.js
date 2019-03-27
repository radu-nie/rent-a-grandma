"use strict";
// export { }
Object.defineProperty(exports, "__esModule", { value: true });
// var mongoose = require("mongoose");
// const BaseUser = require("../models/User");
// var Schema = mongoose.Schema;
// const ServiceJobProviderSchema = BaseUser.discriminator("ServiceJobProvider", new Schema({
//     services: [{ type: Schema.Types.ObjectId, ref: "ServiceJob" }]
// }));
// exports = mongoose.model("ServiceJobProvider", ServiceJobProviderSchema);
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
/** Service Job Provider Schema */
const ServiceJobProviderSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true }
});
exports.default = mongoose.model('ServiceJob', ServiceJobProviderSchema);
