import { Document, Schema, ObjectId } from 'mongoose';

export interface BookDocument extends Document {
    _id?: ObjectId;
    name?: string;
    price?: number;
    type?: string;
    createdDate?: Date;
    updatedDate?: Date;
    isDeleted?: boolean;
}

export const BookSchema: Schema = new Schema({
    name: String,
    price: Number,
    type: String,
    createdDate: Date,
    updatedDate: Date,
    isDeleted: Boolean,
});
