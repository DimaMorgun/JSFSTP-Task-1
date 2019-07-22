import { Injectable } from '@nestjs/common';

import { Model, objectid } from 'mongoose';

import { AuthorDocument, AuthorSchema } from 'src/documents';

import * as mongoose from 'mongoose';
import { promises } from 'fs';

@Injectable()
export class AuthorRepository {
    private readonly authorModel: Model<AuthorDocument>;

    constructor() {
        this.authorModel = mongoose.model('Author', AuthorSchema);
    }

    public async getById(id: objectid): Promise<AuthorDocument> {
        const author: AuthorDocument = await this.authorModel.findById(id).exec();

        return author;
    }

    public async getByIdList(ids: objectid[]): Promise<AuthorDocument[]> {
        let query = {};

        if (ids.length > 0) {
            query = {
                _id: {
                    $in: ids,
                },
            };
        }

        const authors: AuthorDocument[] = await this.authorModel.find(query).exec();

        return authors;
    }

    public async getAll(): Promise<AuthorDocument[]> {
        const authors: AuthorDocument[] = await this.authorModel.find().exec();

        return authors;
    }

    public async getPaginated(skip: number, limit: number): Promise<AuthorDocument[]> {
        const authors: AuthorDocument[] = await this.authorModel.find().skip(skip).limit(limit).exec();

        return authors;
    }

    public async create(createAuthor: AuthorDocument): Promise<AuthorDocument> {
        const createdAuthor: Model<AuthorDocument> = new this.authorModel(createAuthor);
        const newAuthor: AuthorDocument = createdAuthor.save();

        return newAuthor;
    }

    public async update(updateAuthor: AuthorDocument): Promise<AuthorDocument> {
        const updatedAuthor: AuthorDocument = await this.authorModel.findByIdAndUpdate(updateAuthor._id, updateAuthor);

        return updatedAuthor;
    }

    public async delete(id: objectid): Promise<AuthorDocument> {
        const deletedAuthor: AuthorDocument = await this.authorModel.findByIdAndRemove(id);

        return deletedAuthor;
    }

    public async getAwailableByIdList(ids: objectid[]): Promise<objectid[]> {
        let query = {};

        // Todo: validation.
        if (ids.length > 0) {
            query = {
                _id: {
                    $in: ids,
                },
            };
        }

        const authors: AuthorDocument[] = await this.authorModel.find(query).exec();
        const availableIds: objectid[] = authors.map(({ _id }) => _id);

        return availableIds;
    }

    public async assingBook(authorIds: objectid[], bookId: objectid): Promise<number> {
        let processedDocuments: number = 0;

        if (authorIds.length > 0 && bookId) {
            const filterQuery = {
                _id: {
                    $in: authorIds,
                },
            };

            const updateQuery = {
                push: {
                    $books: bookId,
                },
            };

            // Todo: define type.
            const x = await this.authorModel.updateMany(filterQuery, updateQuery);
            processedDocuments = x.n;
        }

        return processedDocuments;
    }
}
