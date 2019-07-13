import { Injectable } from '@nestjs/common';

import { Types } from 'mongoose';

import { UserRepository } from 'src/repositories';
import { UserModel, CreateUserModel, UpdateUserModel } from 'src/models';
import { UserDocument } from 'src/documents';

import * as crypto from 'crypto';

@Injectable()
export class UserService {
    private saltLength: number = 16;
    private passwordHashEncryptType: string = 'sha512';
    private stringFormat: string = 'hex';
    private encodingAlgorithm: crypto.HexBase64Latin1Encoding = 'hex';

    constructor(private readonly userRepository: UserRepository) { }

    async getById(id: string): Promise<UserModel> {
        let user: UserModel = {};

        const isValidId: boolean = Types.ObjectId.isValid(id);
        if (isValidId) {
            user = await this.userRepository.getById(id);
        }

        return user;
    }

    async getList(): Promise<UserModel[]> {
        const users: UserModel[] = await this.userRepository.getAll();

        return users;
    }

    async getPaginated(skip: number, limit: number): Promise<UserModel[]> {
        const users: UserModel[] = await this.userRepository.getPaginated(skip, limit);

        return users;
    }

    async create(createUserModel: CreateUserModel): Promise<UserModel> {
        const createUser: UserDocument = {};
        createUser.fullName = createUserModel.fullName;
        createUser.username = createUserModel.userName;
        createUser.createdDate = new Date();
        createUser.updatedDate = new Date();
        createUser.isDeleted = false;

        const newUser: UserModel = await this.userRepository.create(createUser);

        return newUser;
    }

    async update(updateUserModel: UpdateUserModel): Promise<UserModel> {
        const updateUser: UserDocument = {};
        updateUser._id = updateUserModel.id;
        updateUser.fullName = updateUserModel.fullName;
        updateUser.updatedDate = new Date();
        updateUser.isDeleted = false;

        const updatedUser: UserModel = await this.userRepository.update(updateUser);

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

    private getRandomSalt(): string {
        const test = crypto.randomBytes(Math.ceil(this.saltLength / 2));
        // tslint:disable-next-line:no-console
        console.log('Type "test"=', typeof(test));

        const randomHexBytes: string = crypto.randomBytes(Math.ceil(this.saltLength / 2)).toString(this.stringFormat);
        const randomSalt: string = randomHexBytes.slice(0, this.saltLength);

        return randomSalt;
    }

    private getPasswordHash(password: string, salt: string): string {
        const passwordHash = crypto.createHmac(this.passwordHashEncryptType, salt);
        // tslint:disable-next-line:no-console
        console.log('Type "crypto"=', typeof(crypto));
        // tslint:disable-next-line:no-console
        console.log('Type "passwordHash"=', typeof(passwordHash));
        passwordHash.update(password);

        const hashedPassword: string = passwordHash.digest(this.encodingAlgorithm);

        return hashedPassword;
    }
}
