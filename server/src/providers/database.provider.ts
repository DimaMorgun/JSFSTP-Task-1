import { Sequelize } from 'sequelize-typescript';
import * as env from 'src/environment';
import { BookEntity, AuthorEntity } from 'src/entities';

const environment = env.environment();

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'mysql',
                host: environment.mysqlHost,
                port: environment.mysqlPort,
                username: environment.mysqlUsername,
                password: environment.mysqlPassword,
                database: environment.mysqlDatabaseName,
            });
            sequelize.addModels([BookEntity, AuthorEntity]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
