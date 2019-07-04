import { Connection, Document, Schema, Provider } from 'mongoose';

export interface Book extends Document {
    readonly name: string;
    readonly imageSrc: string;
    readonly authorName: string;
    readonly created: Date;
    readonly updated: Date;
    readonly isDeleted: boolean;
}

export const BookSchema: Schema = new Schema({
    name: String,
    imageSrc: String,
    authorName: String,
    created: Date,
    updated: Date,
    isDeleted: Boolean,
});

export const bookProviders: Provider = [
    {
        provide: 'BOOK_MODEL',
        useFactory: (connection: Connection) => connection.model('Book', BookSchema),
        inject: ['MONGO-CONNECTION'],
    },
];
