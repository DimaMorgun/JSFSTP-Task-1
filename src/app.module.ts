import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookController } from './book/book.controller';
import { HomeController } from './home/home.controller';

@Module({
  imports: [],
  controllers: [AppController, BookController, HomeController],
  providers: [AppService],
})
export class AppModule {}
