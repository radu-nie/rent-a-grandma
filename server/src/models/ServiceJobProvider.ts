export { }

var mongoose = require("mongoose");
const BaseUser = require("../models/User");

var Schema = mongoose.Schema;

const ServiceJobProviderSchema = BaseUser.discriminator("ServiceJobProvider", new Schema({
    services: [{ type: Schema.Types.ObjectId, ref: "ServiceJob" }]
}));

exports = mongoose.model("ServiceJobProvider", ServiceJobProviderSchema);