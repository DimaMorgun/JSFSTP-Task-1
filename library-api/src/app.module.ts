import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { BookModule } from './modules/book/book.module';
import { AppMiddleware } from './app.middleware';

@Module({
  imports: [BookModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AppMiddleware)
      .forRoutes('book');
  }
}
