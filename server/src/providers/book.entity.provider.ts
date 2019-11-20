import { BookEntity } from 'src/entities';

export const bookProvider = [
    {
        provide: 'BOOK_REPOSITORY',
        useValue: BookEntity,
    },
];
