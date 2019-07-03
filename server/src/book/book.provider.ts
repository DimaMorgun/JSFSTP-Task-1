import { BookSchema } from './scheme/book.schema';
import { Connection } from 'mongoose';

export const bookProviders = [
    {
        provide: 'BOOK_MODEL',
        useFactory: (connection: Connection) => connection.model('Book', BookSchema),
        inject: ['MONGO-DEV-CONNECTION'],
    },
];
