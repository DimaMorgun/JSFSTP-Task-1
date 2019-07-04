import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import { BookModule } from 'src/book/book.module';
import { Middleware } from 'src/core/common';
import { HomeModule } from 'src/home/home.module';

@Module({
  imports: [BookModule, HomeModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Middleware)
      .forRoutes('/');
  }
}
