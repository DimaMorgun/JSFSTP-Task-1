import * as mongoose from 'mongoose';
import { Observable } from 'rxjs';

export const databaseProviders = [
    {
        provide: 'MONGO-DEV-CONNECTION',
        useFactory: (): Observable<typeof mongoose> =>
            mongoose.connect('mongodb://localhost/library-dev', { useNewUrlParser: true, useFindAndModify: false }),
    },
];
