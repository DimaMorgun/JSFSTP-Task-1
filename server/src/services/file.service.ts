import { Injectable } from '@nestjs/common';

import { FileRepository } from 'src/repositories';
import { FileModel, UploadFileModel } from 'src/models';
import { FileDocument } from 'src/documents/file.document';
import { BookService } from './book.service';

@Injectable()
export class FileService {
    private encoding: string = 'base64';

    constructor(
        private bookService: BookService,
        private fileRepository: FileRepository,
    ) { }

    public async create(file: UploadFileModel, bookId: string): Promise<FileModel> {
        const createdFile: FileModel = {};

        const isBookAvailable: boolean = await this.bookService.isBookAvailable(bookId);
        if (!isBookAvailable) {
            return createdFile;
        }

        const createFileDocument: FileDocument = {};
        createFileDocument.bookId = bookId;
        createFileDocument.originalname = file.originalname;
        createFileDocument.data = file.buffer;
        createFileDocument.mimetype = file.mimetype;
        createFileDocument.size = file.size;

        const createdFileDocument: FileDocument = await this.fileRepository.create(createFileDocument);

        createdFile.id = createdFileDocument._id;
        createdFile.bookId = createdFileDocument.bookId;
        createdFile.originalname = createdFileDocument.originalname;
        createdFile.base64Data = await this.convertToBase64(createdFileDocument.data);
        createdFile.mimetype = createdFileDocument.mimetype;
        createdFile.size = createdFileDocument.size;

        return createdFile;
    }

    private async convertToBase64(buff: Buffer): Promise<string> {
        const base64data = buff.toString(this.encoding);

        return base64data;
    }
}
