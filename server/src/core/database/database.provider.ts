import * as mongoose from 'mongoose';

import { databaseMongoConnectionUrl } from 'src/core/environment/environment.config';

export const databaseProviders = [
    {
        provide: 'MONGO-CONNECTION',
        useFactory: (): Promise<typeof mongoose> =>
            mongoose.connect(databaseMongoConnectionUrl, { useNewUrlParser: true, useFindAndModify: false }),
    },
];
