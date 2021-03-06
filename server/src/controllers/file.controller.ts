import { Controller, Post, UseInterceptors, UploadedFile, Get, Param, Put, Delete } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { FileService } from 'src/services';
import { FileModel, UploadFileModel } from 'src/models';

@Controller('file')
@ApiUseTags('file')
export class FileController {
    constructor(
        private readonly fileService: FileService,
    ) { }

    @Get(':id')
    public async getFileById(@Param('id') id: string): Promise<string> {
        return `Take single file with id = ${id}.`;
    }

    @Get('book/:id')
    public async getFilesByBookId(@Param('id') id: string): Promise<string> {
        return `Take list of files for book with id = ${id}.`;
    }

    @Get(':skip/:limit')
    public async getBookListWithPaging(@Param('skip') skip: string, @Param('limit') limit: string): Promise<string> {
        return `Take limit of files from ${skip} to ${+limit + +skip}.`;
    }

    @Post(':bookId')
    @UseInterceptors(FileInterceptor('file'))
    public async uploadFile(@UploadedFile() uploadFileModel: UploadFileModel, @Param('bookId') bookId: string): Promise<FileModel> {
        const createdFile: FileModel = await this.fileService.create(uploadFileModel, bookId);

        return createdFile;
    }

    @Put()
    @UseInterceptors(FileInterceptor('file'))
    public async updateFile(@UploadedFile() file): Promise<string> {
        return `Updated file.`;
    }

    @Delete(':id')
    public async deleteFile(@Param('id') id: string): Promise<string> {
        return `File with id = ${id} mark as deleted.`;
    }

    @Delete('book/:id')
    public async deleteFilesForBook(@Param('id') id: string): Promise<string> {
        return `All files for book with id = ${id} mark as deleted.`;
    }
}
