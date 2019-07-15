import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import { Connection } from 'mongoose';

import { MiddlewareRequest, HttpStrategy } from './common';
import { Environment } from 'src/environment/environment';
import { UserController, HomeController, BookController } from 'src/controllers';
import { AuthService, BookService, UserService } from 'src/services';
import { BookRepository, UserRepository } from 'src/repositories';
import { BookMapper } from 'src/mappers';

@Module({
  imports: [],
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
