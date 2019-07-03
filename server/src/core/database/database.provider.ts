import * as mongoose from 'mongoose';
import { Observable } from 'rxjs';
import { devDBConnectionUrl } from '../common/environment';

export const databaseProviders = [
    {
        provide: 'MONGO-DEV-CONNECTION',
        useFactory: (): Observable<typeof mongoose> =>
            mongoose.connect(devDBConnectionUrl, { useNewUrlParser: true, useFindAndModify: false }),
    },
];
