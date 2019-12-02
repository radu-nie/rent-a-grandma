import * as mongoose from 'mongoose';
import { Mongoose, Schema, Document } from 'mongoose';

export interface IUser extends Document {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
    password: string;
    firstName: string,
    lastName: string
};

const userSchemaOptions = { discriminatorKey: "type" };

const UserSchema = new Schema({
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, userSchemaOptions);

const BaseUser = mongoose.model<IUser>("User", UserSchema);

const Customer = BaseUser.discriminator("Customer", new Schema({
    customerProperty: String
}));

const ServiceJobProvider = BaseUser.discriminator("ServiceJobProvider", new Schema({
    serviceJobProperty: String
}));

// declare module UserModels {
//     export function User(): mongoose.Model<IUser, {}>;
//     export function Customer(): mongoose.Model<IUser
// }

export default BaseUser;
export { BaseUser, Customer, ServiceJobProvider };