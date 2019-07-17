import { Injectable } from '@nestjs/common';

import { Model, objectid } from 'mongoose';

import { UserSchema, UserDocument } from 'src/documents';

import * as mongoose from 'mongoose';

@Injectable()
export class UserRepository {
    private readonly userModel: Model<UserDocument>;

    constructor() {
        this.userModel = mongoose.model('User', UserSchema);
    }

    public async getById(id: objectid): Promise<UserDocument> {
        const user: UserDocument = await this.userModel.findById(id).exec();

        return user;
    }

    public async getByUsername(username: string): Promise<UserDocument> {
        const search = { username };

        const user: UserDocument = await this.userModel.findOne(search).exec();

        return user;
    }

    public async getAll(): Promise<UserDocument[]> {
        const users: UserDocument[] = await this.userModel.find().exec();

        return users;
    }

    public async getPaginated(skip: number, limit: number): Promise<UserDocument[]> {
        const users: UserDocument[] = await this.userModel.find().skip(skip).limit(limit).exec();

        return users;
    }

    public async create(createUser: UserDocument): Promise<UserDocument> {
        const createdUser: Model<UserDocument> = new this.userModel(createUser);
        const newUser: UserDocument = createdUser.save();

        return newUser;
    }

    public async update(updateUser: UserDocument): Promise<UserDocument> {
        const updatedUser: UserDocument = await this.userModel.findByIdAndUpdate(updateUser._id, updateUser);

        return updatedUser;
    }

    public async delete(id: objectid): Promise<UserDocument> {
        const deletedUser: UserDocument = await this.userModel.findByIdAndRemove(id);

        return deletedUser;
    }
}
