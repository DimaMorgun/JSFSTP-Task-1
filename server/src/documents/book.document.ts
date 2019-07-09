import { Document, Schema, ObjectId } from 'mongoose';

export interface BookDocument extends Document {
    _id?: ObjectId;
    name?: string;
    createdDate?: Date;
    updatedDate?: Date;
    isDeleted?: boolean;
}

export const BookSchema: Schema = new Schema({
    name: String,
    createdDate: Date,
    updatedDate: Date,
    isDeleted: Boolean,
});
