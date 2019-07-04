import * as mongoose from 'mongoose';

import { databaseMongoConnectionUrl } from 'src/core/common';

export const databaseProviders = [
    {
        provide: 'MONGO-CONNECTION',
        useFactory: (): Promise<typeof mongoose> =>
            mongoose.connect(databaseMongoConnectionUrl, { useNewUrlParser: true, useFindAndModify: false }),
    },
];
