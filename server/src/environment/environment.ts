import { Injectable } from '@nestjs/common';

@Injectable()
export class Environment {
    public httpPort: string = '3000';
    public httpsPort: string = '443';
    public databaseProviderName: string = 'MONGO-CONNECTION';
    public databaseMongoConnectionUrl: string;
    public buildMode;

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
        this.databaseMongoConnectionUrl = 'mongodb://localhost/library-dev';
        this.buildMode = 'Development';
    }

    production() {
        this.databaseMongoConnectionUrl = 'mongodb://localhost/library-prod';
        this.buildMode = 'Production';
    }
}
