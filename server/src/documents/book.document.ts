import { Document, Schema, ObjectId } from 'mongoose';

export interface BookDocument extends Document {
    _id?: ObjectId;
    name?: string;
    price?: number;
    type?: string;
    authors?: string[];
    createdDate?: Date;
    updatedDate?: Date;
    isDeleted?: boolean;
}

export const BookSchema: Schema = new Schema({
    name: String,
    price: Number,
    type: String,
    authors: [{ type: Schema.Types.ObjectId, ref: 'Author' }],
    createdDate: Date,
    updatedDate: Date,
    isDeleted: Boolean,
});
