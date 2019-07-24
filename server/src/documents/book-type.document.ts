import { Document, Schema, ObjectId } from 'mongoose';

export interface BookTypeDocument extends Document {
    _id?: ObjectId;
    name?: string;
    createdDate?: Date;
    updatedDate?: Date;
    isDeleted?: boolean;
}

export const BookTypeSchema: Schema = new Schema({
    name: String,
    createdDate: Date,
    updatedDate: Date,
    isDeleted: Boolean,
});
