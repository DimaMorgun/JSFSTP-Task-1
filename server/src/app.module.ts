import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { Connection } from 'mongoose';

import { MiddlewareRequest, LocalStrategy, JwtStrategy, PasswordHelper } from 'src/common';
import { Environment } from 'src/environment/environment';
import { UserController, HomeController, BookController, AuthController, FileController } from 'src/controllers';
import { AuthService, BookService, UserService, FileService } from 'src/services';
import { BookRepository, UserRepository, FileRepository } from 'src/repositories';
import { BookMapper, UserMapper } from 'src/mappers';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: Environment.jwtSecretKey,
      signOptions: { expiresIn: Environment.tokenExpireTime },
    }),
  ],
  controllers: [
    AuthController,
    UserController,
    HomeController,
    BookController,
    FileController,
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
    FileService,
    FileRepository,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MiddlewareRequest)
      .forRoutes('/');
  };
}
