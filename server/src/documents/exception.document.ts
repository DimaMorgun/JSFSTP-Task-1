import { Document, ObjectId, Schema } from 'mongoose';

export interface ExceptionDocument extends Document {
    _id: ObjectId;
    instance: string;
    message: string;
    stackTrace: string;
    createdDate: Date;
    updatedDate: Date;
    isResolved: boolean;
}

export const ExceptionSchema: Schema = new Schema({
    instance: String,
    message: String,
    stackTrace: String,
    createdDate: Date,
    updatedDate: Date,
    isResolved: Boolean,
});
