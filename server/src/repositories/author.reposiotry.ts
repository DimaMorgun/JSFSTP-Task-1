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

    public async getByIdList(IdList: objectid[]): Promise<AuthorDocument[]> {
        let query = {};

        if (IdList.length > 0) {
            query = {
                _id: {
                    $in: IdList,
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

    public async getAwailableIdListByIdList(IdList: objectid[]): Promise<objectid[]> {
        let availableAuthorIdList: objectid[] = new Array<objectid>();

        if (IdList && IdList.length > 0) {
            const query = {
                _id: {
                    $in: IdList,
                },
            };

            availableAuthorIdList = await this.authorModel.find(query).distinct('_id').exec();
        }

        return availableAuthorIdList;
    }

    public async assingBook(authorIdList: objectid[], bookId: objectid): Promise<number> {
        let processedDocuments: number = 0;

        if (authorIdList.length > 0 && bookId) {
            const filterQuery = {
                _id: {
                    $in: authorIdList,
                },
            };

            const updateQuery = {
                $push: {
                    books: bookId,
                },
            };

            const updateResponse = await this.authorModel.updateMany(filterQuery, updateQuery);
            processedDocuments = updateResponse.nModified;
        }

        return processedDocuments;
    }

    public async unassignBook(authorIdList: objectid[], bookId: objectid): Promise<number> {
        let processedDocuments: number = 0;

        if (authorIdList && authorIdList.length > 0 && bookId) {
            const filterQuery = {
                $and: [
                    {
                        _id: {
                            $in: authorIdList,
                        },
                    },
                    {
                        books: bookId,
                    },
                ],
            };

            const updateQuery = {
                $pull: {
                    books: bookId,
                },
            };

            const updateResponse = await this.authorModel.updateMany(filterQuery, updateQuery);
            processedDocuments = updateResponse.nModified;
        }

        return processedDocuments;
    }

    public async getIdListWithUnassignedBook(authorIdList: objectid[], bookId: objectid): Promise<objectid[]> {
        let notAssignedAuthorIdList: objectid[] = new Array<objectid>();

        if (authorIdList.length > 0 && bookId) {
            const query = {
                $and: [
                    {
                        _id: {
                            $in: authorIdList,
                        },
                    },
                    {
                        books: {
                            $ne: bookId,
                        },
                    },
                ],
            };

            notAssignedAuthorIdList = await this.authorModel.find(query).distinct('_id').exec();
        }

        return notAssignedAuthorIdList;
    }

    public async getIdListAssignedByBookIdExcludeByIdList(bookId: objectid, excludeAuthorIdList: objectid[]): Promise<objectid[]> {
        let excludedAuthorIdList: objectid[] = new Array<objectid>();

        if (bookId) {
            const query = {
                $and: [
                    {
                        _id: {
                            $nin: excludeAuthorIdList,
                        },
                    },
                    { books: bookId },
                ],
            };

            excludedAuthorIdList = await this.authorModel.find(query).distinct('_id').exec();
        }

        return excludedAuthorIdList;
    }
}
