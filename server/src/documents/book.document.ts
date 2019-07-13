import { Connection, Document, Schema, Provider, ObjectId } from 'mongoose';

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

export const bookProviders: Provider = [
    {
        provide: 'BOOK_MODEL',
        useFactory: (connection: Connection) => connection.model('Book', BookSchema),
        inject: ['MONGO-CONNECTION'],
    },
];