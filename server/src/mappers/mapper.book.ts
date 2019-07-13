import { BookDocument } from 'src/documents';
import { BookModel, UpdateBookModel } from 'src/models';
import { Injectable } from '@nestjs/common';
import { CreateBookModel } from 'src/models';

@Injectable()
export class BookMapper {
    public getBookDocument(bookModel: CreateBookModel | UpdateBookModel): BookDocument {
        let bookDocument: BookDocument = {};

        const bookModelType = typeof bookModel;
        // tslint:disable-next-line:no-console
        console.log(bookModelType);
        if (bookModelType === typeof CreateBookModel) {
            bookDocument = this.getBookDocumentFromCreateBookModel(bookModel as CreateBookModel);
        }
        if (bookModelType === typeof UpdateBookModel) {
            bookDocument = this.getBookDocumentFromUpdateBookModel(bookModel as UpdateBookModel);
        }

        return bookDocument;
    }

    private getBookDocumentFromCreateBookModel(createBookModel: CreateBookModel): BookDocument {
        const bookDocument: BookDocument = {};
        bookDocument.name = createBookModel.name;
        bookDocument.createdDate = new Date();
        bookDocument.updatedDate = new Date();
        bookDocument.isDeleted = false;

        return bookDocument;
    }

    private getBookDocumentFromUpdateBookModel(updateBookModel: UpdateBookModel): BookDocument {
        const bookDocument: BookDocument = {};
        bookDocument._id = updateBookModel.id;
        bookDocument.name = updateBookModel.name;
        bookDocument.updatedDate = new Date();

        return bookDocument;
    }

    public getBookModel(bookDocument: BookDocument): BookModel {
        const bookModel: BookModel = {};
        bookModel.id = bookDocument._id;
        bookModel.name = bookDocument.name;
        bookModel.createdDate = bookDocument.createdDate;
        bookModel.updatedDate = bookDocument.updatedDate;
        bookModel.isDeleted = bookDocument.isDeleted;

        return bookModel;
    }

    async getBookModels(bookDocuments: BookDocument[]): Promise<BookModel[]> {
        const bookModels: BookModel[] = new Array<BookModel>();

        console.log(bookDocuments);

        bookDocuments.forEach(bookDocument => {
            const bookModel: BookModel = {};
            bookModel.id = bookDocument._id;
            bookModel.name = bookDocument.name;
            bookModel.createdDate = bookDocument.createdDate;
            bookModel.updatedDate = bookDocument.updatedDate;
            bookModel.isDeleted = bookDocument.isDeleted;

            bookModels.push(bookModel);
        });

        return bookModels;
    }
}
