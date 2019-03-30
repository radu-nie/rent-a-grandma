import * as mongoose from 'mongoose';
import { Mongoose, Schema, Document } from 'mongoose';

export interface IUserAuthenticate {
    username: string;
    password: string;
}

export interface IUser extends Document {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
    password: string;
};

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

export default mongoose.model<IUser>('User', UserSchema)