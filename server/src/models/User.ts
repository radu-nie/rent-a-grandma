var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Address = require("../models/address");
const ServiceJob = require("../models/ServiceJob");

var BaseUserSchema = new Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    active: Boolean,
    lastModified: Date,
    dateAdded: Date,
    token: { type: String, required: true },
    addresses: { type: [Address], required: true }
}, { collection: "users", discriminatoryKey: "_type" });
/*
var UserSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    userName: String,
    password: String,
    firstName: String,
    lastName: String,
    active: Boolean,
    date_added: Date,
    last_modified: Date,
    last_password: String,
    token: String,
    addresses: [Address],
    services: [{ type: Schema.Types.ObjectId, ref: "ServiceJob" }]
}, { collection: "users", discriminatoryKey: "_type" });
*/

mongoose.exports = mongoose.model('BaseUser', BaseUserSchema);
