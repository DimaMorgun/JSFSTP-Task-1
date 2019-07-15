import { Injectable } from '@nestjs/common';

import { BookDocument } from 'src/documents';
import { BookModel, CreateBookModel, UpdateBookModel } from 'src/models';

@Injectable()
export class BookMapper {
    public getBookDocumentFromCreateBookModel(createBookModel: CreateBookModel): BookDocument {
        const bookDocument: BookDocument = {};

        if (createBookModel) {
            bookDocument.name = createBookModel.name;
            bookDocument.createdDate = new Date();
            bookDocument.updatedDate = new Date();
            bookDocument.isDeleted = false;
        }

        return bookDocument;
    }

    public getBookDocumentFromUpdateBookModel(updateBookModel: UpdateBookModel): BookDocument {
        const bookDocument: BookDocument = {};

        if (updateBookModel) {
            bookDocument._id = updateBookModel.id;
            bookDocument.name = updateBookModel.name;
            bookDocument.updatedDate = new Date();
        }

        return bookDocument;
    }

    public getBookModel(bookDocument: BookDocument): BookModel {
        const bookModel: BookModel = {};

        if (bookDocument) {
            bookModel.id = bookDocument._id;
            bookModel.name = bookDocument.name;
            bookModel.createdDate = bookDocument.createdDate;
            bookModel.updatedDate = bookDocument.updatedDate;
            bookModel.isDeleted = bookDocument.isDeleted;
        }

        return bookModel;
    }

    async getBookModels(bookDocuments: BookDocument[]): Promise<BookModel[]> {
        const bookModels: BookModel[] = new Array<BookModel>();

        if (bookDocuments && bookDocuments.length > 0) {
            for (const bookDocument of bookDocuments) {
                const bookModel: BookModel = {};
                bookModel.id = bookDocument._id;
                bookModel.name = bookDocument.name;
                bookModel.createdDate = bookDocument.createdDate;
                bookModel.updatedDate = bookDocument.updatedDate;
                bookModel.isDeleted = bookDocument.isDeleted;

                bookModels.push(bookModel);
            }
        }

        return bookModels;
    }
}
