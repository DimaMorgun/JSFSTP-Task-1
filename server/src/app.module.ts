import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { Connection } from 'mongoose';

import { MiddlewareRequest, LocalStrategy, JwtStrategy, Encryptor } from 'src/common';
import { Environment } from 'src/environment/environment';
import { UserController, HomeController, BookController, AuthController, FileController, AuthorController } from 'src/controllers';
import { AuthService, BookService, UserService, FileService, AuthorService } from 'src/services';
import { BookRepository, UserRepository, FileRepository, AuthorRepository } from 'src/repositories';

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
    AuthorController,
  ],
  providers: [
    Connection,
    LocalStrategy,
    JwtStrategy,
    Environment,
    Encryptor,
    AuthService,
    UserService,
    UserRepository,
    BookService,
    BookRepository,
    FileService,
    FileRepository,
    AuthorService,
    AuthorRepository,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MiddlewareRequest)
      .forRoutes('/');
  }
}
