// export { }

// var mongoose = require("mongoose");
// const BaseUser = require("../models/User");

// var Schema = mongoose.Schema;

// const ServiceJobProviderSchema = BaseUser.discriminator("ServiceJobProvider", new Schema({
//     services: [{ type: Schema.Types.ObjectId, ref: "ServiceJob" }]
// }));

// exports = mongoose.model("ServiceJobProvider", ServiceJobProviderSchema);

import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './customer.model';

/** Service Job Model */
export interface IServiceJob extends Document {
    name: String;
    description: String;
    user: IUser['_id'];
}

/** Service Job Provider Schema */
const ServiceJobProviderSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, required: true }
});

export default mongoose.model<IServiceJob>('ServiceJob', ServiceJobProviderSchema);