import { environmentDevelopment, environmentProduction } from 'src/environment';

export interface Environment {
    httpPort?: string;
    httpsPort?: string;
    environment?: string;
    databaseProviderName?: string;
    databaseMongoConnectionUrl?: string;
    jwtSecretKey?: string;
    tokenExpireTime?: number;
    mysqlHost?: string;
    mysqlPort?: number;
    mysqlUsername?: string;
    mysqlPassword?: string;
    mysqlDatabaseName?: string;
}

export const environment = () => {
    const configuration = process.env.NODE_ENV;
    switch (configuration) {
        case 'DEVELOPMENT':
            return environmentDevelopment;
        case 'PRODUCTION':
            return environmentProduction;
        default:
            return environmentDevelopment;
    }
};
