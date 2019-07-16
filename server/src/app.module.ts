import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { Connection } from 'mongoose';

import { MiddlewareRequest, LocalStrategy, JwtStrategy, PasswordHelper } from 'src/common';
import { Environment } from 'src/environment/environment';
import { UserController, HomeController, BookController, AuthController } from 'src/controllers';
import { AuthService, BookService, UserService } from 'src/services';
import { BookRepository, UserRepository } from 'src/repositories';
import { BookMapper, UserMapper } from 'src/mappers';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [
    AuthController,
    UserController,
    HomeController,
    BookController,
  ],
  providers: [
    Connection,
    LocalStrategy,
    JwtStrategy,
    Environment,
    PasswordHelper,
    AuthService,
    UserMapper,
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
  };
}
