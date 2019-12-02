import * as mongoose from 'mongoose';
import { Mongoose, Schema, Document } from 'mongoose';
import { Validator } from "../helpers/Validator";
import { IAddress, AddressSchema } from './address.model';

export interface IUser extends Document {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
    password: string;
    firstName: string,
    lastName: string,
    aggrementGdpr: boolean,
    address: [IAddress]
};

const userSchemaOptions = { discriminatorKey: "type" };

const UserSchema = new Schema({
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    aggrementGdpr: { type: Boolean, required: true },
    address: { type: [AddressSchema], required: true },
}, userSchemaOptions);

const BaseUser = mongoose.model<IUser>("User", UserSchema);

const Customer = BaseUser.discriminator("Customer", new Schema({

}));

const ServiceJobProvider = BaseUser.discriminator("ServiceJobProvider", new Schema({
    uniqueIdentifier: {
        type: String,
        validate: {
            validator: function (value) {
                return Validator.validateCNP(value);
            },
            message: props => `${props.value} is not valid personal unique identifier`
        },
        required: [true, "Unique identifier is required"]
    },
    identityCardType: {
        type: String,
        required: [true, "Identity card type is required"]
    },
    identityCardNo: {
        type: Number,
        required: [true, "Identity card number is required"]
    },
    recordImagePath: {
        type: String,
        required: [true, "Record image is required"]
    },
    utilitiesImagePath: {
        type: String,
        required: [true, "Utilities image is required"]
    },
    userImagePath: {
        type: String,
        required: [true, "Your facial image is required"]
    }
}));

export default BaseUser;
export { BaseUser, Customer, ServiceJobProvider };