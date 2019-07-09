import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import { Connection } from 'mongoose';

import { MiddlewareRequest } from 'src/common';
import { Environment } from 'src/environment/environment';
import { DatabaseModule } from 'src/database';
import { HomeController } from 'src/controllers/home.controller';
import { BookController } from 'src/controllers/book.controller';
import { BookService } from 'src/services';
import { BookRepository } from 'src/repositories';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [
    HomeController,
    BookController,
  ],
  providers: [
    Connection,
    Environment,
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
