import { AuthorEntity } from 'src/entities';

export const authorProvider = [
    {
        provide: 'AUTHOR_REPOSITORY',
        useValue: AuthorEntity,
    },
];
