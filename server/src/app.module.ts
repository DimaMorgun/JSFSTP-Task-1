import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { AppMiddleware } from './app.middleware';
import { HomeModule } from './home/home.module';

@Module({
  imports: [BookModule, HomeModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AppMiddleware)
      .forRoutes('book');
  }
}
