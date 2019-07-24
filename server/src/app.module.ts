import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { Connection } from 'mongoose';

import { MiddlewareRequest, LocalStrategy, JwtStrategy, Encryptor } from 'src/common';
import { Environment } from 'src/environment/environment';
import {
  UserController,
  HomeController,
  BookController,
  AuthController,
  FileController,
  AuthorController,
  BookTypeController,
  UserRoleController,
} from 'src/controllers';
import { AuthService, BookService, UserService, FileService, AuthorService, BookTypeService, UserRoleService } from 'src/services';
import { BookRepository, UserRepository, FileRepository, AuthorRepository, BookTypeRepository, UserRoleRepository } from 'src/repositories';

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
    BookTypeController,
    UserRoleController,
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
    BookTypeService,
    BookTypeRepository,
    UserRoleService,
    UserRoleRepository,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MiddlewareRequest)
      .forRoutes('/');
  }
}
