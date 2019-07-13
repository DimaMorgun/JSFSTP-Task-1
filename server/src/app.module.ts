import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import { Connection } from 'mongoose';

import { MiddlewareRequest, HttpStrategy } from 'src/common';
import { Environment } from 'src/environment/environment';
import { UserController, HomeController, BookController } from 'src/controllers';
import { AuthService, BookService, UserService } from 'src/services';
import { BookRepository, UserRepository } from 'src/repositories';
import { BookMapper } from 'src/mappers';
import { DatabaseModule } from 'src/database/database.module';
import { databaseProviders } from 'src/database/database.provider';
import { bookProviders } from './documents';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [
    UserController,
    HomeController,
    BookController,
  ],
  providers: [
    Connection,
    Environment,
    HttpStrategy,
    AuthService,
    UserService,
    UserRepository,
    ...bookProviders,
    BookMapper,
    BookService,
    BookRepository,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MiddlewareRequest)
      .forRoutes('/');
  }
}
