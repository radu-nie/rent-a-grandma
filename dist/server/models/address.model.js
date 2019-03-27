"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
/** Service Job Provider Schema */
const AddressSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true }
});
exports.default = mongoose.model('Address', AddressSchema);
