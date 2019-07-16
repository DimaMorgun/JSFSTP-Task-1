import { Injectable } from '@nestjs/common';

import { Types } from 'mongoose';

import { UserRepository } from 'src/repositories';
import { UserModel, CreateUserModel, UpdateUserModel } from 'src/models';
import { UserDocument } from 'src/documents';
import { UserMapper } from 'src/mappers';
import { PasswordHelper } from 'src/common/password.helper';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly userMapper: UserMapper,
        private readonly paswordHelper: PasswordHelper,
    ) { }

    async getById(id: string): Promise<UserModel> {
        let user: UserModel = {};

        const isValidId: boolean = Types.ObjectId.isValid(id);
        if (isValidId) {
            const userDocument: UserDocument = await this.userRepository.getById(id);
            user = this.userMapper.getUserModel(userDocument);
        }

        return user;
    }

    async getByUsername(username: string): Promise<UserModel> {
        let user: UserModel = {};

        if (username) {
            const userDocument: UserDocument = await this.userRepository.getByUsername(username);
            user = this.userMapper.getUserModel(userDocument);
        }

        return user;
    }

    async getList(): Promise<UserModel[]> {
        const userDocuments: UserDocument[] = await this.userRepository.getAll();
        const users: UserModel[] = await this.userMapper.getUserModels(userDocuments);

        return users;
    }

    async getPaginated(skip: number, limit: number): Promise<UserModel[]> {
        const userDocuments: UserDocument[] = await this.userRepository.getPaginated(skip, limit);
        const users: UserModel[] = await this.userMapper.getUserModels(userDocuments);

        return users;
    }

    async create(createUserModel: CreateUserModel): Promise<UserModel> {
        const createUserDocument: UserDocument = await this.userMapper.getUserDocumentFromCreateUserModel(createUserModel);
        createUserDocument.passwordSalt = await this.paswordHelper.getRandomSalt();
        createUserDocument.passwordHash = await this.paswordHelper.getPasswordHash(createUserModel.password, createUserDocument.passwordSalt);

        const createdUserDocument: UserDocument = await this.userRepository.create(createUserDocument);
        const createdUser: UserModel = this.userMapper.getUserModel(createdUserDocument);

        return createdUser;
    }

    async update(updateUserModel: UpdateUserModel): Promise<UserModel> {
        const updateUserDocument: UserDocument = this.userMapper.getUserDocumentFromUpdateUserModel(updateUserModel);
        if (updateUserModel && updateUserModel.password) {
            updateUserDocument.passwordSalt = await this.paswordHelper.getRandomSalt();
            updateUserDocument.passwordHash = await this.paswordHelper.getPasswordHash(updateUserModel.password, updateUserDocument.passwordSalt);
        }

        const updatedUserDocument: UserDocument = await this.userRepository.update(updateUserDocument);
        const updatedUser: UserModel = this.userMapper.getUserModel(updatedUserDocument);

        return updatedUser;
    }

    async delete(id: string): Promise<UserModel> {
        let deletedUser: UserModel = {};

        const isValidId: boolean = Types.ObjectId.isValid(id);
        if (isValidId) {
            deletedUser = await this.userRepository.delete(id);
        }

        return deletedUser;
    }
}
