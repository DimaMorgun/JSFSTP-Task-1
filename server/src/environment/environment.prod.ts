import fs = require('fs');

export class EnvironmentProd {
    public static httpPort: string = '80';
    public static httpsPort: string = '443';
    public static databaseProviderName: string = 'MONGO-CONNECTION';
    public static databaseMongoConnectionUrl: string = 'mongodb://127.0.0.1:27017/library-prod';
    public static jwtSecretKey: string = fs.readFileSync('src/secrets/jwtSecretKey.key').toString();
    public static tokenExpireTime: number = 60 * 60 * 24;
}
