import { Injectable } from '@nestjs/common';

import { Model, objectid } from 'mongoose';

import { FileDocument, FileSchema } from 'src/documents';

import * as mongoose from 'mongoose';


@Injectable()
export class FileRepository {
    private readonly fileModel: Model<FileDocument>;

    constructor() {
        this.fileModel = mongoose.model('File', FileSchema);
    }

    async create(createFile: FileDocument): Promise<FileDocument> {
        const createdFile: Model<FileDocument> = new this.fileModel(createFile);
        const newFile: FileDocument = createdFile.save();

        return newFile;
    }
}
