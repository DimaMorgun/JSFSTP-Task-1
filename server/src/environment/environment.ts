import { Injectable } from '@nestjs/common';

import fs = require('fs');

@Injectable()
export class Environment {
    public httpPort: string = '80';
    public httpsPort: string = '443';
    public databaseProviderName: string = 'MONGO-CONNECTION';
    public databaseMongoConnectionUrl: string;
    public buildMode: string;
    public static jwtSecretKey: string = fs.readFileSync('src/secrets/jwtSecretKey.key').toString();
    public static tokenExpireTime = 60 * 60 * 24;

    constructor() {
        const environment = process.env.NODE_ENV || 'development';

        switch (environment) {
            case 'DEVELOPMENT':
                this.development();
                break;
            case 'PRODUCTION':
                this.production();
                break;
            default:
                this.development();
                break;
        }
    }

    development() {
        this.databaseMongoConnectionUrl = 'mongodb://127.0.0.1:27017/library-dev';
        this.buildMode = 'Development';
    }

    production() {
        this.databaseMongoConnectionUrl = 'mongodb://127.0.0.1:27017/library-prod';
        this.buildMode = 'Production';
    }
}
