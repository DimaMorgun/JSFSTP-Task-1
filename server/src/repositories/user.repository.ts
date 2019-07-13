import { Injectable } from '@nestjs/common';

import { Model, objectid } from 'mongoose';

import { UserSchema, UserDocument } from 'src/documents';

import { Environment } from 'src/environment/environment';

@Injectable()
export class UserRepository {
    private readonly userModel: Model<UserDocument>;
    constructor(
        private readonly environment: Environment,
    ) {
        // const mongoose = require('mongoose');
        // this.userModel = mongoose.model('User', UserSchema);
        // mongoose.createConnection(environment.databaseMongoConnectionUrl, { useNewUrlParser: true, useFindAndModify: false });
    }

    async getById(id: objectid): Promise<UserDocument> {
        const user: UserDocument = await this.userModel.findById(id).exec();

        return user;
    }

    async getAll(): Promise<UserDocument[]> {
        const users: UserDocument[] = await this.userModel.find().exec();

        return users;
    }

    async getPaginated(skip: number, limit: number): Promise<UserDocument[]> {
        const users: UserDocument[] = await this.userModel.find().skip(skip).limit(limit).exec();

        return users;
    }

    async create(createUser: UserDocument): Promise<UserDocument> {
        const createdUser: Model<UserDocument> = new this.userModel(createUser);
        const newUser: UserDocument = createdUser.save();

        return newUser;
    }

    async update(updateUser: UserDocument): Promise<UserDocument> {
        const updatedUser: UserDocument = await this.userModel.findByIdAndUpdate(updateUser._id, updateUser);

        return updatedUser;
    }

    async delete(id: objectid): Promise<UserDocument> {
        const deletedUser: UserDocument = await this.userModel.findByIdAndRemove(id);

        return deletedUser;
    }
}
