import { Document, Schema, ObjectId } from 'mongoose';

export interface FileDocument extends Document {
    _id?: ObjectId;
    bookId?: string;
    originalname?: string;
    mimetype?: string;
    data?: Buffer;
    size?: number;
}

export const FileSchema: Schema = new Schema({
    originalname: String,
    bookId: String,
    mimetype: String,
    data: Buffer,
    size: Number,
});
