import * as mongoose from 'mongoose';
import { Observable } from 'rxjs';
import { databaseMongoConnectionUrl } from '../environment-dev/database.config';

export const databaseProviders = [
    {
        provide: 'MONGO-CONNECTION',
        useFactory: (): Observable<typeof mongoose> =>
            mongoose.connect(databaseMongoConnectionUrl, { useNewUrlParser: true, useFindAndModify: false }),
    },
];
