import fs = require('fs');
import { Environment } from './environment';

// tslint:disable-next-line:one-variable-per-declaration
export const environmentDevelopment: Environment = {
    httpPort: '80',
    httpsPort: '443',
    environment: process.env.NODE_ENV,
    databaseProviderName: 'MONGO-CONNECTION',
    databaseMongoConnectionUrl: 'mongodb://127.0.0.1:27017/library-dev',
    jwtSecretKey: fs.readFileSync('src/secrets/jwtSecretKey.key').toString(),
    tokenExpireTime: 60 * 60 * 24,
};
