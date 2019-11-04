import {
  Module,
  NestModule,
  MiddlewareConsumer,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'mongoose';

import {
  MiddlewareRequest,
  LocalStrategy,
  JwtStrategy,
  Encryptor,
} from 'src/common';
import { environment } from 'src/environment';

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
import { BookTypeORMService } from './services/type-orm/book-type-orm.service';
import { BookTypeORMController } from './controllers/type-orm/book-type-orm.controller';
import { BookEntity } from 'dist/entities/book.entity';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'book-store',
      entities: [BookEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([BookEntity]),
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
    BookTypeORMController,
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
    BookTypeORMService,
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
