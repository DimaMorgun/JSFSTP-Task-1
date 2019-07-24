import { Controller, Get, Param, Delete, Post, Put, Body, Query } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { BookTypeModel, CreateBookTypeModel, UpdateBookTypeModel } from 'src/models';
import { BookTypeService } from 'src/services';
import { BookTypeDocument } from 'src/documents';

@Controller('bookType')
@ApiUseTags('bookType')
export class BookTypeController {
    constructor(
        private readonly bookTypeService: BookTypeService,
    ) { }

    @Get(':id')
    public async getBookTypeById(@Param('id') id: string): Promise<BookTypeModel> {
        const bookType: BookTypeModel = await this.bookTypeService.getById(id);

        return bookType;
    }

    @Get()
    public async getBookTypeList(): Promise<BookTypeDocument[]> {
        const bookTypes: BookTypeDocument[] = await this.bookTypeService.getList();

        return bookTypes;
    }

    @Post()
    public async createBookType(@Body() createBookTypeModel: CreateBookTypeModel): Promise<BookTypeModel> {
        const createdBookType: BookTypeModel = await this.bookTypeService.create(createBookTypeModel);

        return createdBookType;
    }

    @Put()
    public async updateBookType(@Body() updateBookTypeModel: UpdateBookTypeModel): Promise<BookTypeModel> {
        const updatedBookType: BookTypeModel = await this.bookTypeService.update(updateBookTypeModel);

        return updatedBookType;
    }

    @Delete(':id')
    public async deleteBookType(@Param('id') id: string): Promise<BookTypeModel> {
        const isDeleted: BookTypeModel = await this.bookTypeService.delete(id);

        return isDeleted;
    }
}
