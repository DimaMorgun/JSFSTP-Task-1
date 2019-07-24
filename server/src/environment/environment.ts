import { Injectable } from '@nestjs/common';
import { EnvironmentProd, EnvironmentDev } from 'src/environment';

@Injectable()
export class Environment {
    public httpPort: string;
    public httpsPort: string;
    public databaseProviderName: string;
    public databaseMongoConnectionUrl: string;
    public environment: string = process.env.NODE_ENV;
    public static jwtSecretKey: string = process.env.NODE_ENV === 'DEVELOPMENT' ? EnvironmentDev.jwtSecretKey : EnvironmentProd.jwtSecretKey;
    public static tokenExpireTime: number = process.env.NODE_ENV === 'DEVELOPMENT' ? EnvironmentDev.tokenExpireTime : EnvironmentProd.tokenExpireTime;

    constructor() {
        switch (this.environment) {
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

    private development() {
        this.httpPort = EnvironmentDev.httpPort;
        this.httpsPort = EnvironmentDev.httpsPort;
        this.databaseProviderName = EnvironmentDev.databaseProviderName;
        this.databaseMongoConnectionUrl = EnvironmentDev.databaseMongoConnectionUrl;
    }

    private production() {
        this.httpPort = EnvironmentProd.httpPort;
        this.httpsPort = EnvironmentProd.httpsPort;
        this.databaseProviderName = EnvironmentProd.databaseProviderName;
        this.databaseMongoConnectionUrl = EnvironmentProd.databaseMongoConnectionUrl;
    }
}
