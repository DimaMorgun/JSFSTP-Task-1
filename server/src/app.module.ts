import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import { Connection } from 'mongoose';

import { MiddlewareRequest, HttpStrategy, PasswordHelper } from 'src/common';
import { Environment } from 'src/environment/environment';
import { UserController, HomeController, BookController, AuthController } from 'src/controllers';
import { AuthService, BookService, UserService } from 'src/services';
import { BookRepository, UserRepository } from 'src/repositories';
import { BookMapper, UserMapper } from 'src/mappers';

@Module({
  imports: [],
  controllers: [
    AuthController,
    UserController,
    HomeController,
    BookController,
  ],
  providers: [
    Connection,
    HttpStrategy,
    Environment,
    PasswordHelper,
    UserMapper,
    UserService,
    UserRepository,
    BookMapper,
    BookService,
    BookRepository,
    AuthService,
  ],
  exports: [
    UserService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MiddlewareRequest)
      .forRoutes('/');
  }
}
