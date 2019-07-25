import { Injectable } from '@nestjs/common';

import { Types } from 'mongoose';

import { AuthorRepository } from 'src/repositories';
import { AuthorModel, CreateAuthorModel, UpdateAuthorModel } from 'src/models';
import { AuthorDocument } from 'src/documents';

@Injectable()
export class AuthorService {
    constructor(
        private readonly authorRepository: AuthorRepository,
    ) { }

    public async getById(id: string): Promise<AuthorModel> {
        const author: AuthorModel = {};

        const isValidId: boolean = Types.ObjectId.isValid(id);
        if (!isValidId) {
            return author;
        }

        const authorDocument: AuthorDocument = await this.authorRepository.getById(id);
        if (authorDocument) {
            author.id = authorDocument._id;
            author.name = authorDocument.name;
            author.country = authorDocument.country;
            author.birthday = authorDocument.birthday;
            author.deathday = authorDocument.deathday;
            author.books = authorDocument.books;
            author.createdDate = authorDocument.createdDate;
            author.updatedDate = authorDocument.updatedDate;
            author.isDeleted = authorDocument.isDeleted;
        }

        return author;
    }

    public async getList(): Promise<AuthorModel[]> {
        const authors: AuthorModel[] = new Array<AuthorModel>();

        const authorDocuments: AuthorDocument[] = await this.authorRepository.getAll();
        if (!authorDocuments || authorDocuments.length === 0) {
            return authors;
        }

        for (const authorDocument of authorDocuments) {
            const authorModel: AuthorModel = {};
            authorModel.id = authorDocument._id;
            authorModel.name = authorDocument.name;
            authorModel.country = authorDocument.country;
            authorModel.birthday = authorDocument.birthday;
            authorModel.deathday = authorDocument.deathday;
            authorModel.books = authorDocument.books;
            authorModel.createdDate = authorDocument.createdDate;
            authorModel.updatedDate = authorDocument.updatedDate;
            authorModel.isDeleted = authorDocument.isDeleted;

            authors.push(authorModel);
        }

        return authors;
    }

    public async getPaginated(skip: number, limit: number): Promise<AuthorModel[]> {
        const authors: AuthorModel[] = new Array<AuthorModel>();

        const authorDocuments: AuthorDocument[] = await this.authorRepository.getPaginated(skip, limit);
        if (!authorDocuments || authorDocuments.length === 0) {
            return authors;
        }

        for (const authorDocument of authorDocuments) {
            const authorModel: AuthorModel = {};
            authorModel.id = authorDocument._id;
            authorModel.name = authorDocument.name;
            authorModel.country = authorDocument.country;
            authorModel.birthday = authorDocument.birthday;
            authorModel.deathday = authorDocument.deathday;
            authorModel.books = authorDocument.books;
            authorModel.createdDate = authorDocument.createdDate;
            authorModel.updatedDate = authorDocument.updatedDate;
            authorModel.isDeleted = authorDocument.isDeleted;

            authors.push(authorModel);
        }

        return authors;
    }

    public async create(createAuthorModel: CreateAuthorModel): Promise<AuthorModel> {
        const createdAuthor: AuthorModel = {};
        const createAuthorDocument: AuthorDocument = {};

        if (createAuthorModel) {
            createAuthorDocument.name = createAuthorModel.name;
            createAuthorDocument.country = createAuthorModel.country;
            createAuthorDocument.birthday = createAuthorModel.birthday;
            createAuthorDocument.deathday = createAuthorModel.deathday;
            createAuthorDocument.books = createAuthorModel.books;
            createAuthorDocument.createdDate = new Date();
            createAuthorDocument.updatedDate = new Date();
            createAuthorDocument.isDeleted = false;
        }

        const createdAuthorDocument: AuthorDocument = await this.authorRepository.create(createAuthorDocument);
        if (createdAuthorDocument) {
            createdAuthor.id = createdAuthorDocument._id;
            createdAuthor.name = createdAuthorDocument.name;
            createdAuthor.country = createdAuthorDocument.country;
            createdAuthor.birthday = createdAuthorDocument.birthday;
            createdAuthor.deathday = createdAuthorDocument.deathday;
            createdAuthor.books = createdAuthorDocument.books;
            createdAuthor.createdDate = createdAuthorDocument.createdDate;
            createdAuthor.updatedDate = createdAuthorDocument.updatedDate;
            createdAuthor.isDeleted = createdAuthorDocument.isDeleted;
        }

        return createdAuthor;
    }

    public async update(updateAuthorModel: UpdateAuthorModel): Promise<AuthorModel> {
        const updatedAuthor: AuthorModel = {};
        const updateAuthorDocument: AuthorDocument = {};

        if (updateAuthorModel) {
            updateAuthorDocument._id = updateAuthorModel.id;
            updateAuthorDocument.name = updateAuthorModel.name;
            updateAuthorDocument.country = updateAuthorModel.country;
            updateAuthorDocument.birthday = updateAuthorModel.birthday;
            updateAuthorDocument.deathday = updateAuthorModel.deathday;
            updateAuthorDocument.books = updateAuthorModel.books;
            updateAuthorDocument.updatedDate = new Date();
        }

        const updatedAuthorDocument: AuthorDocument = await this.authorRepository.update(updateAuthorDocument);
        if (updatedAuthorDocument) {
            updatedAuthor.id = updatedAuthorDocument._id;
            updatedAuthor.name = updatedAuthorDocument.name;
            updatedAuthor.country = updatedAuthorDocument.country;
            updatedAuthor.birthday = updatedAuthorDocument.birthday;
            updatedAuthor.deathday = updatedAuthorDocument.deathday;
            updatedAuthor.books = updatedAuthorDocument.books;
            updatedAuthor.createdDate = updatedAuthorDocument.createdDate;
            updatedAuthor.updatedDate = updatedAuthorDocument.updatedDate;
            updatedAuthor.isDeleted = updatedAuthorDocument.isDeleted;
        }

        return updatedAuthor;
    }

    public async delete(id: string): Promise<AuthorModel> {
        const deletedAuthor: AuthorModel = {};

        const isValidId: boolean = Types.ObjectId.isValid(id);
        if (!isValidId) {
            return deletedAuthor;
        }

        const deletedAuthorDocument: AuthorDocument = await this.authorRepository.delete(id);
        if (deletedAuthorDocument) {
            deletedAuthor.id = deletedAuthorDocument._id;
            deletedAuthor.name = deletedAuthorDocument.name;
            deletedAuthor.country = deletedAuthorDocument.country;
            deletedAuthor.birthday = deletedAuthorDocument.birthday;
            deletedAuthor.deathday = deletedAuthorDocument.deathday;
            deletedAuthor.books = deletedAuthorDocument.books;
            deletedAuthor.createdDate = deletedAuthorDocument.createdDate;
            deletedAuthor.updatedDate = deletedAuthorDocument.updatedDate;
            deletedAuthor.isDeleted = deletedAuthorDocument.isDeleted;
        }

        return deletedAuthor;
    }

    public async isAuthorAvailable(id: string): Promise<boolean> {
        const authorModel: AuthorModel = await this.getById(id);

        const isAuthorAvailable: boolean = authorModel.isDeleted != null && !authorModel.isDeleted;

        return isAuthorAvailable;
    }
}
