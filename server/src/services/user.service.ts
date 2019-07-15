import { Injectable } from '@nestjs/common';

import { Types } from 'mongoose';
import { HexBase64Latin1Encoding, Hmac, createHmac, randomBytes } from 'crypto';

import { UserRepository } from 'src/repositories';
import { UserModel, CreateUserModel, UpdateUserModel } from 'src/models';
import { UserDocument } from 'src/documents';
import { UserMapper } from 'src/mappers';

@Injectable()
export class UserService {
    private saltLength: number = 16;
    private passwordHashEncryptType: string = 'sha512';
    private stringFormat: string = 'hex';
    private encodingAlgorithm: HexBase64Latin1Encoding = 'hex';

    constructor(
        private readonly userRepository: UserRepository,
        private readonly userMapper: UserMapper,
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
        createUserDocument.passwordSalt = await this.getRandomSalt();
        createUserDocument.passwordHash = await this.getPasswordHash(createUserModel.password, createUserDocument.passwordSalt);

        const createdUserDocument: UserDocument = await this.userRepository.create(createUserDocument);
        const createdUser: UserModel = this.userMapper.getUserModel(createdUserDocument);

        return createdUser;
    }

    async update(updateUserModel: UpdateUserModel): Promise<UserModel> {
        const updateUserDocument: UserDocument = this.userMapper.getUserDocumentFromUpdateUserModel(updateUserModel);
        if (updateUserModel && updateUserModel.password) {
            updateUserDocument.passwordSalt = await this.getRandomSalt();
            updateUserDocument.passwordHash = await this.getPasswordHash(updateUserModel.password, updateUserDocument.passwordSalt);
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

    async getRandomSalt(): Promise<string> {
        const randomHexBytes: string = randomBytes(Math.ceil(this.saltLength / 2)).toString(this.stringFormat);
        const randomSalt: string = randomHexBytes.slice(0, this.saltLength);

        return randomSalt;
    }

    async getPasswordHash(password: string, salt: string): Promise<string> {
        const passwordHash: Hmac = createHmac(this.passwordHashEncryptType, salt);
        passwordHash.update(password);

        const hashedPassword: string = passwordHash.digest(this.encodingAlgorithm);

        return hashedPassword;
    }
}
