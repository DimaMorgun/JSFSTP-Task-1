import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database';
import { BookController } from './controllers/book.controller';
import { BookService } from 'src/core/services';
import { BookRepository } from 'src/core/repositories';
import { bookProviders } from 'src/core/documents';

@Module({
  imports: [DatabaseModule],
  controllers: [BookController],
  providers: [...bookProviders, BookService, BookRepository],
})
export class BookModule { }
