import {
  Module,
  NestModule,
  MiddlewareConsumer,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { Connection } from 'mongoose';

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

import {
  AuthService,
  BookService,
  UserService,
  FileService,
  AuthorService,
  BookTypeService,
  UserRoleService,
} from 'src/services';

import {
  BookRepository,
  UserRepository,
  FileRepository,
  AuthorRepository,
  BookTypeRepository,
  UserRoleRepository,
} from 'src/repositories';

import {
  MiddlewareRequest,
  LocalStrategy,
  JwtStrategy,
  Encryptor,
} from 'src/common';
import { environment } from 'src/environment';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: environment().jwtSecretKey,
      signOptions: { expiresIn: environment().tokenExpireTime },
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
