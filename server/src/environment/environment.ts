import { Injectable } from '@nestjs/common';
import { EnvironmentProd, EnvironmentDev } from 'src/environment';

@Injectable()
export class Environment {
    public httpPort: string;
    public httpsPort: string;
    public databaseProviderName: string;
    public databaseMongoConnectionUrl: string;
    public buildMode: string;
    public static jwtSecretKey: string;
    public static tokenExpireTime: number;

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
        this.httpPort = EnvironmentDev.httpPort;
        this.httpsPort = EnvironmentDev.httpsPort;
        this.databaseProviderName = EnvironmentDev.databaseProviderName;
        this.databaseMongoConnectionUrl = EnvironmentDev.databaseMongoConnectionUrl;
        this.buildMode = EnvironmentDev.buildMode;
        Environment.jwtSecretKey = EnvironmentDev.jwtSecretKey;
        Environment.tokenExpireTime = EnvironmentDev.tokenExpireTime;
    }

    production() {
        this.httpPort = EnvironmentProd.httpPort;
        this.httpsPort = EnvironmentProd.httpsPort;
        this.databaseProviderName = EnvironmentProd.databaseProviderName;
        this.databaseMongoConnectionUrl = EnvironmentProd.databaseMongoConnectionUrl;
        this.buildMode = EnvironmentProd.buildMode;
        Environment.jwtSecretKey = EnvironmentProd.jwtSecretKey;
        Environment.tokenExpireTime = EnvironmentProd.tokenExpireTime;
    }
}
