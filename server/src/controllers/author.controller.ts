import { Controller, Get, Param, Delete, Post, Put, Body, Query } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { AuthorModel, CreateAuthorModel, UpdateAuthorModel } from 'src/models';
import { AuthorService } from 'src/services';
import { AuthorDocument } from 'src/documents';

@Controller('author')
@ApiUseTags('author')
export class AuthorController {
    constructor(
        private readonly authorService: AuthorService,
    ) { }

    @Get(':id')
    public async getAuthorById(@Param('id') id: string): Promise<AuthorModel> {
        const author: AuthorModel = await this.authorService.getById(id);

        return author;
    }

    @Get()
    public async getAuthorList(): Promise<AuthorDocument[]> {
        const authors: AuthorDocument[] = await this.authorService.getList();

        return authors;
    }

    @Post()
    public async createAuthor(@Body() createAuthorModel: CreateAuthorModel): Promise<AuthorModel> {
        const createdAuthor: AuthorModel = await this.authorService.create(createAuthorModel);

        return createdAuthor;
    }

    @Put()
    public async updateAuthor(@Body() updateAuthorModel: UpdateAuthorModel): Promise<AuthorModel> {
        const updatedAuthor: AuthorModel = await this.authorService.update(updateAuthorModel);

        return updatedAuthor;
    }

    @Delete(':id')
    public async deleteAuthor(@Param('id') id: string): Promise<AuthorModel> {
        const isDeleted: AuthorModel = await this.authorService.delete(id);

        return isDeleted;
    }
}
