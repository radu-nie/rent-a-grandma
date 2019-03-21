import { Int32 } from "bson";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AddressSchema = new Schema({
    street: String,
    city: String,
    county: String,
    country: String,
    number: Number,
    postalCode: Number,
    apartment: Number,
    floor: Number,
    zip: String
})

var Address = mongoose.model("Address", AddressSchema);
mongoose.exports = Address;