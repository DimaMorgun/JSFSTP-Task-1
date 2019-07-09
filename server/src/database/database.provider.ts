import * as mongoose from 'mongoose';

import { Environment } from 'src/environment/environment';

export const environment: Environment = new Environment();

export const databaseProviders = [
    {
        provide: environment.databaseProviderName,
        useFactory: (): Promise<typeof mongoose> =>
            mongoose.connect(environment.databaseMongoConnectionUrl, { useNewUrlParser: true, useFindAndModify: false }),
    },
];
