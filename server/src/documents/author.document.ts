import { Document, Schema, ObjectId } from 'mongoose';

export interface AuthorDocument extends Document {
    _id?: ObjectId;
    name?: string;
    country?: string;
    birthday?: Date;
    deathday?: Date;
    books?: string[];
    createdDate?: Date;
    updatedDate?: Date;
    isDeleted?: boolean;
}

export const AuthorSchema: Schema = new Schema({
    name: String,
    country: String,
    birthday: Date,
    deathday: Date,
    books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
    createdDate: Date,
    updatedDate: Date,
    isDeleted: Boolean,
});
