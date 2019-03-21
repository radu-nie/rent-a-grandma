export { }

var mongoose = require("mongoose");
const BaseUser = require('../models/User');

var Schema = mongoose.Schema;

const CustomerSchema = BaseUser.discriminator("Customer", new Schema({

}));

module.exports = mongoose.model("Customer", CustomerSchema);