import { Document, Schema, ObjectId } from 'mongoose';

export interface UserDocument extends Document {
    _id?: ObjectId;
    fullname?: string;
    username?: string;
    passwordHash?: string;
    passwordSalt?: string;
    createdDate?: Date;
    updatedDate?: Date;
    userRole?: string;
    isDeleted?: boolean;
}

export const UserSchema: Schema = new Schema({
    fullname: String,
    username: String,
    passwordHash: String,
    passwordSalt: String,
    createdDate: Date,
    updatedDate: Date,
    userRole: String,
    isDeleted: Boolean,
});
