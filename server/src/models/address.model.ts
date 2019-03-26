import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './customer.model';

/** Service Job Model */
export interface IAddress extends Document {
    street: String;
    city: String;
    county: String;
    country: String;
    number: Number;
    postalCode: Number;
    apartment: Number;
    floor: Number;
    zip: String;
    user: IUser['_id'];
}

/** Service Job Provider Schema */
const AddressSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, required: true }
});

export default mongoose.model<IAddress>('Address', AddressSchema);