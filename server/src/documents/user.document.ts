import { Document, Schema, ObjectId } from 'mongoose';

export interface UserDocument extends Document {
    _id?: ObjectId;
    fullName?: string;
    username?: string;
    passwordHash?: string;
    passwordSalt?: string;
    createdDate?: Date;
    updatedDate?: Date;
    isAdmin?: boolean;
    isDeleted?: boolean;
}

export const UserSchema: Schema = new Schema({
    fullName: String,
    username: String,
    passwordHash: String,
    passwordSalt: String,
    createdDate: Date,
    updatedDate: Date,
    isAdmin: Boolean,
    isDeleted: Boolean,
});
