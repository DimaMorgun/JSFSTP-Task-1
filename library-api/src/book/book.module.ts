import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { bookProviders } from './book.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [BookController],
  providers: [BookService, ...bookProviders],
})
export class BookModule { }
