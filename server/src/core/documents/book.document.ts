import * as mongoose from 'mongoose';

export interface Book extends mongoose.Document {
    readonly name: string;
    readonly imageSrc: string;
    readonly authorName: string;
    readonly created: Date;
    readonly updated: Date;
    readonly isDeleted: boolean;
}

export const BookSchema = new mongoose.Schema({
    name: String,
    imageSrc: String,
    authorName: String,
    created: Date,
    updated: Date,
    isDeleted: Boolean,
});

export const bookProviders = [
    {
        provide: 'BOOK_MODEL',
        useFactory: (connection: mongoose.Connection) => connection.model('Book', BookSchema),
        inject: ['MONGO-DEV-CONNECTION'],
    },
];
