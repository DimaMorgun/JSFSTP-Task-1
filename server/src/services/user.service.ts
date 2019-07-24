import { Injectable, Inject, forwardRef } from '@nestjs/common';

import { Types } from 'mongoose';

import { UserRepository } from 'src/repositories';
import { UserModel, CreateUserModel, UpdateUserModel } from 'src/models';
import { UserDocument } from 'src/documents';
import { Encryptor } from 'src/common/password.helper';
import { UserRole } from 'src/enums';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        @Inject(forwardRef(() => Encryptor))
        private readonly paswordHelper: Encryptor,
    ) { }

    public async getById(id: string): Promise<UserModel> {
        const user: UserModel = {};

        const isValidId: boolean = Types.ObjectId.isValid(id);
        if (!isValidId) {
            return user;
        }

        const userDocument: UserDocument = await this.userRepository.getById(id);
        if (userDocument) {
            user.id = userDocument._id;
            user.username = userDocument.username;
            user.fullName = userDocument.fullName;
            user.passwordSalt = userDocument.passwordSalt;
            user.passwordHash = userDocument.passwordHash;
            user.createdDate = userDocument.createdDate;
            user.updatedDate = userDocument.updatedDate;
            user.userRole = userDocument.userRole;
            user.isDeleted = userDocument.isDeleted;
        }

        return user;
    }

    public async getByUsername(username: string): Promise<UserModel> {
        const user: UserModel = {};

        if (!username) {
            return user;
        }

        const userDocument: UserDocument = await this.userRepository.getByUsername(username.toLowerCase());
        if (userDocument) {
            user.id = userDocument._id;
            user.username = userDocument.username;
            user.fullName = userDocument.fullName;
            user.passwordSalt = userDocument.passwordSalt;
            user.passwordHash = userDocument.passwordHash;
            user.createdDate = userDocument.createdDate;
            user.updatedDate = userDocument.updatedDate;
            user.userRole = userDocument.userRole;
            user.isDeleted = userDocument.isDeleted;
        }

        return user;
    }

    public async getList(): Promise<UserModel[]> {
        const users: UserModel[] = new Array<UserModel>();

        const userDocuments: UserDocument[] = await this.userRepository.getAll();
        if (!userDocuments || userDocuments.length === 0) {
            return users;
        }

        for (const userDocument of userDocuments) {
            const userModel: UserModel = {};
            userModel.id = userDocument._id;
            userModel.username = userDocument.username;
            userModel.fullName = userDocument.fullName;
            userModel.passwordSalt = userDocument.passwordSalt;
            userModel.passwordHash = userDocument.passwordHash;
            userModel.createdDate = userDocument.createdDate;
            userModel.updatedDate = userDocument.updatedDate;
            userModel.userRole = userDocument.userRole;
            userModel.isDeleted = userDocument.isDeleted;

            users.push(userModel);
        }

        return users;
    }

    public async getPaginated(skip: number, limit: number): Promise<UserModel[]> {
        const users: UserModel[] = new Array<UserModel>();

        const userDocuments: UserDocument[] = await this.userRepository.getPaginated(skip, limit);
        if (!userDocuments || userDocuments.length === 0) {
            return users;
        }

        for (const userDocument of userDocuments) {
            const userModel: UserModel = {};
            userModel.id = userDocument._id;
            userModel.username = userDocument.username;
            userModel.fullName = userDocument.fullName;
            userModel.passwordSalt = userDocument.passwordSalt;
            userModel.passwordHash = userDocument.passwordHash;
            userModel.createdDate = userDocument.createdDate;
            userModel.updatedDate = userDocument.updatedDate;
            userModel.userRole = userDocument.userRole;
            userModel.isDeleted = userDocument.isDeleted;

            users.push(userModel);
        }

        return users;
    }

    public async create(createUserModel: CreateUserModel): Promise<UserModel> {
        const createdUser: UserModel = {};
        const createUserDocument: UserDocument = {};

        if (!createUserModel.userName == null) {
            return createdUser;
        }

        const isUserExist: boolean = await this.isUserExist(createUserModel.userName);
        if (isUserExist) {
            return createdUser;
        }

        createUserDocument.username = createUserModel.userName;
        createUserDocument.fullName = createUserModel.fullName;
        createUserDocument.passwordSalt = await this.paswordHelper.getRandomSalt();
        createUserDocument.passwordHash = await this.paswordHelper.getSaltedHash(createUserModel.password, createUserDocument.passwordSalt);
        createUserDocument.createdDate = new Date();
        createUserDocument.updatedDate = new Date();
        createUserDocument.userRole = UserRole.client;
        createUserDocument.isDeleted = false;

        const createdUserDocument: UserDocument = await this.userRepository.create(createUserDocument);
        if (createdUserDocument) {
            createdUser.id = createdUserDocument._id;
            createdUser.username = createdUserDocument.username;
            createdUser.fullName = createdUserDocument.fullName;
            createdUser.passwordSalt = createdUserDocument.passwordSalt;
            createdUser.passwordHash = createdUserDocument.passwordHash;
            createdUser.createdDate = createdUserDocument.createdDate;
            createdUser.updatedDate = createdUserDocument.updatedDate;
            createdUser.userRole = createdUserDocument.userRole;
            createdUser.isDeleted = createdUserDocument.isDeleted;
        }

        return createdUser;
    }

    public async update(updateUserModel: UpdateUserModel): Promise<UserModel> {
        const updatedUser: UserModel = {};
        const updateUserDocument: UserDocument = {};

        if (updateUserModel) {
            updateUserDocument._id = updateUserModel.id;
            updateUserDocument.fullName = updateUserModel.fullName;
            updateUserDocument.updatedDate = new Date();
        }

        if (updateUserModel && updateUserModel.password) {
            updateUserDocument.passwordSalt = await this.paswordHelper.getRandomSalt();
            updateUserDocument.passwordHash = await this.paswordHelper.getSaltedHash(updateUserModel.password, updateUserDocument.passwordSalt);
        }

        const updatedUserDocument: UserDocument = await this.userRepository.update(updateUserDocument);
        if (updatedUserDocument) {
            updatedUser.id = updatedUserDocument._id;
            updatedUser.username = updatedUserDocument.username;
            updatedUser.fullName = updatedUserDocument.fullName;
            updatedUser.passwordSalt = updatedUserDocument.passwordSalt;
            updatedUser.passwordHash = updatedUserDocument.passwordHash;
            updatedUser.createdDate = updatedUserDocument.createdDate;
            updatedUser.updatedDate = updatedUserDocument.updatedDate;
            updatedUser.userRole = updatedUserDocument.userRole;
            updatedUser.isDeleted = updatedUserDocument.isDeleted;
        }

        return updatedUser;
    }

    public async delete(id: string): Promise<UserModel> {
        let deletedUser: UserModel = {};

        const isValidId: boolean = Types.ObjectId.isValid(id);
        if (isValidId) {
            deletedUser = await this.userRepository.delete(id);
        }

        return deletedUser;
    }

    public async isUserExist(username: string): Promise<boolean> {
        const userModel: UserModel = await this.getByUsername(username);

        const isUserExist: boolean = userModel.isDeleted != null;

        return isUserExist;
    }
}
